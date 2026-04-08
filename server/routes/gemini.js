import { GoogleGenAI } from '@google/genai';
import { streamSSE } from 'hono/streaming';
import { env } from 'hono/adapter';
import { validateMessages, validateModelId } from '../validation.js';
import { getApiKey } from '../db.js';

export const chatGemini = async (c) => {
  try {
    const body = await c.req.json().catch(() => null);
    if (!body || !body.messages) {
      return c.json({ error: 'Missing messages in request body' }, 400);
    }

    const apiKey = await getApiKey(c, 'gemini_api_key');
    
    // VERY Detailed Logging (Safe)
    console.log(`\n--- GEMINI API KEY DIAGNOSTICS ---`);
    console.log(`Type: ${typeof apiKey}`);
    console.log(`Is Null/Undefined: ${!apiKey}`);
    if (typeof apiKey === 'string') {
        console.log(`Length: ${apiKey.length}`);
        console.log(`Matches 'AIza': ${apiKey.startsWith('AIza')}`);
        console.log(`Has whitespace: ${apiKey !== apiKey.trim()}`);
    }
    console.log(`----------------------------------\n`);

    if (!apiKey || typeof apiKey !== 'string' || apiKey.trim() === '') {
      return c.json({ error: 'Database configuration error: gemini_api_key is missing or empty' }, 503);
    }

    const messages = validateMessages(body.messages);
    const modelId = validateModelId(body.modelId || 'gemini-2.5-flash');

    const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

    const contents = messages.map(msg => {
      const parts = [];
      if (msg.content) parts.push({ text: msg.content });

      if (msg.attachments && msg.attachments.length > 0) {
        msg.attachments.forEach(att => {
          parts.push({
            inlineData: {
              data: att.data,
              mimeType: att.mimeType
            }
          });
        });
      }

      // Google requires at least one part
      if (parts.length === 0) parts.push({ text: ' ' });

      return {
        role: msg.role === 'user' ? 'user' : 'model',
        parts
      };
    });

    const isThinkingModel = modelId.includes('thinking') || modelId.includes('flash-preview');
    const isImageModel = modelId.includes('image');

    const result = await ai.models.generateContentStream({
      model: modelId,
      contents,
      config: {
        ...(isThinkingModel && { thinkingConfig: { includeThoughts: true } }),
        ...(isImageModel && {
          imageConfig: { aspect_ratio: "1:1" },
          responseModalities: ["IMAGE", "TEXT"]
        })
      }
    });

    return streamSSE(c, async (stream) => {
      const gStream = result.stream || result;
      for await (const chunk of gStream) {
        if (!chunk.candidates?.[0]?.content?.parts) continue;
        
        for (const part of chunk.candidates[0].content.parts) {
          let text = '';
          if (part.text) {
            text = part.text;
          } else if (part.inlineData) {
            // Handle generated image! Send as markdown to frontend
            const { data, mimeType } = part.inlineData;
            text = `\n\n![Generated Image](data:${mimeType};base64,${data})\n\n`;
          } else if (part.executableCode) {
            text = `\n\`\`\`${part.executableCode.language || ''}\n${part.executableCode.code}\n\`\`\`\n`;
          } else if (part.codeExecutionResult) {
            text = `\n**Output:**\n\`\`\`\n${part.codeExecutionResult.output}\n\`\`\`\n`;
          } else if (part.thought) {
            text = `\n> *Thinking...*\n${part.thought}\n`;
          }

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
