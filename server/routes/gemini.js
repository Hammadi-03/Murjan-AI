import { GoogleGenAI } from '@google/genai';
import { streamSSE } from 'hono/streaming';
import { env } from 'hono/adapter';
import { validateMessages, validateModelId } from '../validation.js';

export const chatGemini = async (c) => {
  try {
    const body = await c.req.json().catch(() => null);
    if (!body || !body.messages) {
      return c.json({ error: 'Missing messages in request body' }, 400);
    }

    const processEnv = env(c);
    const apiKey = processEnv.GEMINI_API_KEY;
    if (!apiKey) {
      return c.json({ error: 'Server configuration error: GEMINI_API_KEY is not set' }, 503);
    }

    const messages = validateMessages(body.messages);
    const modelId = validateModelId(body.modelId || 'gemini-2.0-flash');

    const ai = new GoogleGenAI({ apiKey });

    const contents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const isThinkingModel = modelId.includes('thinking') || modelId.includes('flash-preview');

    const result = await ai.models.generateContentStream({
      model: modelId,
      contents,
      ...(isThinkingModel && {
        config: {
          thinkingConfig: { includeThoughts: true }
        }
      })
    });

    return streamSSE(c, async (stream) => {
      const gStream = result.stream || result;
      for await (const chunk of gStream) {
        if (!chunk.candidates?.[0]?.content?.parts) continue;
        
        for (const part of chunk.candidates[0].content.parts) {
          let text = '';
          if (part.text) text = part.text;
          else if (part.executableCode) text = `\n\`\`\`${part.executableCode.language || ''}\n${part.executableCode.code}\n\`\`\`\n`;
          else if (part.codeExecutionResult) text = `\n**Output:**\n\`\`\`\n${part.codeExecutionResult.output}\n\`\`\`\n`;
          else if (part.thought) text = `\n> *Thinking...*\n${part.thought}\n`;

          if (text) {
            await stream.writeSSE({ data: JSON.stringify({ content: text }) });
          }
        }
      }
      await stream.writeSSE({ data: '[DONE]' });
    });

  } catch (error) {
    console.error('[Gemini Route Error]', error);
    const msg = error.message || 'AI service error';
    return c.json({ error: msg }, error.status || 500);
  }
};
