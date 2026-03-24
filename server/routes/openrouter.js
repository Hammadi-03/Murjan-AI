import { streamSSE } from 'hono/streaming';
import { env } from 'hono/adapter';
import { validateMessages, validateModelId } from '../validation.js';
import { getApiKey } from '../db.js';

const FALLBACK_MODELS = [
  'google/gemini-2.0-flash-lite:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'qwen/qwen-2.5-72b-instruct:free',
];

export const chatOpenRouter = async (c) => {
  try {
    const apiKey = await getApiKey('openrouter_api_key');
    if (!apiKey) {
      return c.json({ error: 'Database configuration error: openrouter_api_key is not set in api_keys table' }, 503);
    }

    const body = await c.req.json().catch(() => ({}));
    const messages = validateMessages(body.messages);
    const modelId = validateModelId(body.modelId || 'google/gemini-2.0-flash-lite:free');

    const triedModels = new Set([modelId]);
    let currentModel = modelId;
    let attempts = 0;
    const MAX_ATTEMPTS = 3;

    let successResponse = null;

    while (attempts < MAX_ATTEMPTS) {
      try {
        attempts++;
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://murjan-ai.com',
            'X-Title': 'Murjan AI',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ model: currentModel, messages, stream: true, temperature: 0.7 }),
        });

        if (!response.ok) {
          let msg = `HTTP ${response.status}`;
          try { const d = await response.json(); msg = d.error?.message || msg; } catch (_) {}
          throw Object.assign(new Error(msg), { status: response.status });
        }

        successResponse = response;
        break; // Success
      } catch (err) {
        console.warn(`[OpenRouter] attempt ${attempts} failed (${currentModel}):`, err.message);

        if (
          err.message.includes('guardrail') ||
          err.message.includes('data policy') ||
          err.message.includes('User not found') ||
          err.message.includes('OPENROUTER_ACCOUNT')
        ) {
          throw err;
        }

        if (attempts < MAX_ATTEMPTS) {
          const next = FALLBACK_MODELS.find((m) => !triedModels.has(m));
          if (next) { currentModel = next; triedModels.add(next); continue; }
        }
        throw err;
      }
    }

    if (!successResponse) return c.json({ error: 'Failed to connect to OpenRouter' }, 500);

    return streamSSE(c, async (stream) => {
      const reader = successResponse.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value).split('\n');
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6);
          if (raw === '[DONE]') continue;

          let parsed;
          try { parsed = JSON.parse(raw); } catch (_) { continue; }

          if (parsed.error) throw new Error(parsed.error.message || 'Provider error');

          const content = parsed.choices?.[0]?.delta?.content || '';
          if (content) {
            await stream.writeSSE({ data: JSON.stringify({ content }) });
          }
        }
      }
      await stream.writeSSE({ data: '[DONE]' });
    });
  } catch (error) {
    console.error('[OpenRouter Route]', error.message);
    return c.json({ error: error.message }, error.status || 500);
  }
};
