/**
 * POST /api/chat/gemini
 *
 * Proxies streaming requests to Google Gemini.
 * The API key is read from the server environment – NEVER from the client.
 */

import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { validateMessages, validateModelId, requireEnv } from '../validation.js';

export async function chatGemini(req, res) {
  try {
    // 1. Basic body check
    if (!req.body || !req.body.messages) {
      return res.status(400).json({ error: 'Missing messages in request body' });
    }

    // 2. Read key from server env only
    const apiKey = requireEnv('GEMINI_API_KEY');

    // 3. Validate user input server-side
    const messages  = validateMessages(req.body.messages);
    const modelId   = validateModelId(req.body.modelId || 'gemini-2.0-flash');

    // 4. Set SSE headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); 
    res.flushHeaders();

    const ai = new GoogleGenAI({ apiKey });

    // Format for @google/genai v1 SDK
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

    // Handle stream from the result object
    // Note: in unified SDK, we often iterate over result.stream
    const stream = result.stream || result; 

    for await (const chunk of stream) {
      if (!chunk.candidates?.[0]?.content?.parts) continue;
      
      for (const part of chunk.candidates[0].content.parts) {
        let text = '';
        if (part.text)                  text = part.text;
        else if (part.executableCode)   text = `\n\`\`\`${part.executableCode.language || ''}\n${part.executableCode.code}\n\`\`\`\n`;
        else if (part.codeExecutionResult) text = `\n**Output:**\n\`\`\`\n${part.codeExecutionResult.output}\n\`\`\`\n`;
        else if (part.thought)          text = `\n> *Thinking...*\n${part.thought}\n`;

        if (text) {
          res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
        }
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    console.error('[Gemini Route Error]', error);
    const msg = error.message || 'AI service error';
    
    if (!res.headersSent) {
      res.status(error.status || 500).json({ error: msg });
    } else {
      res.write(`data: ${JSON.stringify({ error: msg })}\n\n`);
      res.end();
    }
  }
}
