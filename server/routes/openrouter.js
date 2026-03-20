/**
 * POST /api/chat/openrouter
 *
 * Proxies streaming requests to OpenRouter.
 * The API key is read from the server environment – NEVER from the client.
 */

import { validateMessages, validateModelId, requireEnv } from '../validation.js';

const FALLBACK_MODELS = [
  'google/gemini-2.0-flash-lite:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'qwen/qwen-2.5-72b-instruct:free',
];

export async function chatOpenRouter(req, res) {
  try {
    // 1. Read key from server env only
    const apiKey = requireEnv('OPENROUTER_API_KEY');

    // 2. Validate every piece of user input server-side
    const messages    = validateMessages(req.body.messages);
    const modelId     = validateModelId(req.body.modelId || 'google/gemini-2.0-flash-lite:free');

    // 3. Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    const triedModels   = new Set([modelId]);
    let   currentModel  = modelId;
    let   attempts      = 0;
    const MAX_ATTEMPTS  = 3;

    const runAttempt = async (model) => {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization:  `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://murjan-ai.com',
          'X-Title':      'Murjan AI',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, messages, stream: true, temperature: 0.7 }),
      });

      if (!response.ok) {
        let msg = `HTTP ${response.status}`;
        try { const d = await response.json(); msg = d.error?.message || msg; } catch (_) {}
        throw Object.assign(new Error(msg), { status: response.status });
      }

      const reader  = response.body.getReader();
      const decoder = new TextDecoder();
      let hasData   = false;

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
            hasData = true;
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
          }
        }
      }

      if (!hasData) throw new Error('No data received from provider');
    };

    while (attempts < MAX_ATTEMPTS) {
      try {
        attempts++;
        await runAttempt(currentModel);
        break; // Success
      } catch (err) {
        console.warn(`[OpenRouter] attempt ${attempts} failed (${currentModel}):`, err.message);

        // Hard failures – don't retry, surface directly
        if (
          err.message.includes('guardrail')         ||
          err.message.includes('data policy')        ||
          err.message.includes('User not found')     ||
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

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('[OpenRouter Route]', error.message);
    if (!res.headersSent) {
      res.status(error.status || 500).json({ error: error.message });
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  }
}
