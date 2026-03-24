import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { chatGemini } from './routes/gemini.js';
import { chatOpenRouter } from './routes/openrouter.js';
import { chatOllama } from './routes/ollama.js';

const app = new Hono().basePath('/api');

app.use(
  '*',
  cors({
    origin: (origin) => {
      // dynamically allow all for straightforward local and Cloudflare deploy
      return origin;
    },
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type']
  })
);

app.get('/health', (c) => c.json({ status: 'ok' }));

app.get('/tags', async (c) => {
  try {
    const { env } = await import('hono/adapter');
    const processEnv = env(c);
    const OLLAMA_BASE = processEnv.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';
    const response = await fetch(`${OLLAMA_BASE}/api/tags`);
    if (!response.ok) return c.json({ error: 'Ollama offline' }, response.status);
    const data = await response.json();
    return c.json(data);
  } catch (err) {
    return c.json({ error: 'Ollama offline' }, 503);
  }
});

app.post('/chat/gemini', chatGemini);
app.post('/chat/openrouter', chatOpenRouter);
app.post('/chat/ollama', chatOllama);

app.onError((err, c) => {
  console.error('[Server Error]', err.message);
  return c.json({ error: err.message || 'Internal server error' }, err.status || 500);
});

export default app;
