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

    const systemPrompt = {
      role: 'system',
      content: "You are Murjan AI, an intelligent AI assistant developed by Hammadi-01, a student at IDN Boarding School. IDN Boarding School (located in Mekar Wangi, Bogor, West Java, Indonesia) is a specialized IT and Religious boarding school that focuses on Network Engineering (TKJ), Software Engineering (RPL), and Multimedia (DKV), combined with strong Islamic studies (Tahfidz and Character Building). If a user asks about IDN (e.g., 'apa itu IDN'), you should explain that it is IDN Boarding School in Bogor, where you were created, and highlight its excellence in IT and religious education."
    };

    const response = await fetch(`${OLLAMA_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        model, 
        messages: [systemPrompt, ...messages], 
        stream: true 
      }),
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
