import { streamSSE } from 'hono/streaming';
import { env } from 'hono/adapter';
import { validateMessages, validateModelId } from '../validation.js';

export const chatOllama = async (c) => {
  try {
    const processEnv = env(c);
    const OLLAMA_BASE = processEnv.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';

    const body = await c.req.json().catch(() => ({}));
    const messages = validateMessages(body.messages);
    const model = validateModelId(body.modelId || 'qwen2.5:7b');

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

    return streamSSE(c, async (stream) => {
      const reader = response.body.getReader();
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
            await stream.writeSSE({ data: JSON.stringify({ content: data.message.content }) });
          }
          if (data.done) break;
        }
      }
      await stream.writeSSE({ data: '[DONE]' });
    });
  } catch (error) {
    console.error('[Ollama Route]', error.message);
    return c.json({ error: error.message }, error.status || 500);
  }
};
