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
        systemInstruction: "You are Murjan AI, an intelligent AI assistant developed by Hammadi-01, a student at IDN Boarding School. IDN Boarding School (located in Mekar Wangi, Bogor, West Java, Indonesia) is a specialized IT and Religious boarding school that focuses on Network Engineering (TKJ), Software Engineering (RPL), and Multimedia (DKV), combined with strong Islamic studies (Tahfidz and Character Building). If a user asks about IDN (e.g., 'apa itu IDN'), you should explain that it is IDN Boarding School in Bogor, where you were created, and highlight its excellence in IT and religious education.",
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
    
    const errorMsg = error.message || 'AI service error';
    const status = error.status || error.httpStatusCode || 500;
    
    // Provide user-friendly messages for common API errors
    if (status === 429 || errorMsg.includes('RESOURCE_EXHAUSTED') || errorMsg.includes('quota')) {
      return c.json({ 
        error: 'API rate limit reached. Please wait a moment and try again, or consider upgrading your Gemini API plan.' 
      }, 429);
    }
    if (status === 404 || errorMsg.includes('not found') || errorMsg.includes('NOT_FOUND')) {
      return c.json({ 
        error: `Model not available. The selected model may have been deprecated. Please try a different model.` 
      }, 404);
    }
    
    return c.json({ error: errorMsg }, status);
  }
};
