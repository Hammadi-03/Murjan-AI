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

app.post('/chat/gemini', chatGemini);
app.post('/chat/openrouter', chatOpenRouter);
app.post('/chat/ollama', chatOllama);

app.onError((err, c) => {
  console.error('[Server Error]', err.message);
  return c.json({ error: err.message || 'Internal server error' }, err.status || 500);
});

export default app;
