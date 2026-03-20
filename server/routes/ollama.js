/**
 * POST /api/chat/ollama
 *
 * Proxies streaming requests to a local Ollama instance.
 * No external API key needed, but we still validate user input.
 */

import { validateMessages, validateModelId } from '../validation.js';

const OLLAMA_BASE = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';

export async function chatOllama(req, res) {
  try {
    // Validate user input server-side
    const messages = validateMessages(req.body.messages);
    const model    = validateModelId(req.body.modelId || 'qwen2.5:7b');

    // SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    const response = await fetch(`${OLLAMA_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, stream: true }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw Object.assign(
          new Error(`Model '${model}' not found. Run: ollama pull ${model}`),
          { status: 404 }
        );
      }
      const err = await response.json().catch(() => ({}));
      throw Object.assign(
        new Error(err.error || `Ollama HTTP ${response.status}`),
        { status: response.status }
      );
    }

    const reader  = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const lines = decoder.decode(value, { stream: true }).split('\n');
      for (const line of lines) {
        if (!line.trim()) continue;
        let data;
        try { data = JSON.parse(line); } catch (_) { continue; }

        if (data.message?.content) {
          res.write(`data: ${JSON.stringify({ content: data.message.content })}\n\n`);
        }
        if (data.done) break;
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('[Ollama Route]', error.message);
    if (!res.headersSent) {
      res.status(error.status || 500).json({ error: error.message });
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  }
}
