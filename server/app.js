import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { chatGemini } from './routes/gemini.js';
import { chatOpenRouter } from './routes/openrouter.js';
import { chatOllama } from './routes/ollama.js';
import { login, register, me } from './routes/auth.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'murjan-ai-secret-key-12345';

// NOTE: No basePath here – basePath is set per-environment in the entry files
const app = new Hono();

app.use(
  '*',
  cors({
    origin: (origin) => origin || '*',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware to protect routes
const authMiddleware = async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    c.set('user', decoded);
    await next();
  } catch (err) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
};

app.get('/health', (c) => c.json({ status: 'ok' }));

// Proxy Ollama /api/tags for local status check
app.get('/tags', authMiddleware, async (c) => {
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

// Auth Routes
app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/me', me);

// Protected Chat Routes
app.post('/chat/gemini', authMiddleware, chatGemini);
app.post('/chat/openrouter', authMiddleware, chatOpenRouter);
app.post('/chat/ollama', authMiddleware, chatOllama);

// Catch-all 404 for the API
app.all('*', (c) => {
  return c.json({ error: `Not Found: ${c.req.method} ${c.req.path}` }, 404);
});

app.onError((err, c) => {
  console.error(`[Server Error] ${c.req.method} ${c.req.path}:`, err.message);
  return c.json({ error: err.message || 'Internal server error' }, err.status || 500);
});

export default app;
