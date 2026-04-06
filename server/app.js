import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { chatGemini } from './routes/gemini.js';
import { chatOpenRouter } from './routes/openrouter.js';
import { chatOllama } from './routes/ollama.js';

// NOTE: No basePath here – basePath is set per-environment in the entry files
const app = new Hono();

app.use(
  '*',
  cors({
    origin: (origin) => origin || '*',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  })
);

app.get('/health', (c) => c.json({ status: 'ok' }));

// Proxy Ollama /api/tags for local status check
app.get('/tags', async (c) => {
  try {
    const { env } = await import('hono/adapter');
    const processEnv = env(c);
    const OLLAMA_BASE = processEnv.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';
    const response = await fetch(`${OLLAMA_BASE}/api/tags`);
    if (!response.ok) return c.json({ error: 'Ollama offline' }, response.status);
    return c.json(await response.json());
  } catch (_) {
    return c.json({ error: 'Ollama offline' }, 503);
  }
});

app.post('/chat/gemini', chatGemini);
app.post('/chat/openrouter', chatOpenRouter);
app.post('/chat/ollama', chatOllama);

// Catch-all 404 for the API
app.all('*', (c) => {
  return c.json({ error: `Not Found: ${c.req.method} ${c.req.path}` }, 404);
});

app.onError((err, c) => {
  console.error(`[Server Error] ${c.req.method} ${c.req.path}:`, err.message);
  return c.json({ error: err.message || 'Internal server error' }, err.status || 500);
});

export default app;
