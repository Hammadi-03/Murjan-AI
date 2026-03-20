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
    // 1. Read key from server env only
    const apiKey = requireEnv('GEMINI_API_KEY');

    // 2. Validate every piece of user input server-side
    const messages  = validateMessages(req.body.messages);
    const modelId   = validateModelId(req.body.modelId || 'gemini-2.0-flash');

    // 3. Set SSE headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable nginx buffering if used
    res.flushHeaders();

    const ai = new GoogleGenAI({ apiKey });

    const tools = [{ urlContext: {} }, { codeExecution: {} }];
    const isThinkingModel =
      modelId.includes('flash-preview') || modelId.includes('thinking');

    const config = {
      tools,
      ...(isThinkingModel && {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
      }),
    };

    // Convert to Gemini format
    const contents = messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContentStream({ model: modelId, config, contents });

    for await (const chunk of response) {
      if (!chunk.candidates?.[0]?.content?.parts) continue;
      for (const part of chunk.candidates[0].content.parts) {
        let text = '';
        if (part.text)                  text = part.text;
        else if (part.executableCode)   text = `\n\`\`\`${part.executableCode.language?.toLowerCase() || ''}\n${part.executableCode.code}\n\`\`\`\n`;
        else if (part.codeExecutionResult) text = `\n**Output:**\n\`\`\`\n${part.codeExecutionResult.output}\n\`\`\`\n`;

        if (text) {
          res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
        }
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('[Gemini Route]', error.message);
    if (!res.headersSent) {
      res.status(error.status || 500).json({ error: error.message });
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  }
}
