import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { chatGemini } from './routes/gemini.js';
import { chatOpenRouter } from './routes/openrouter.js';
import { chatOllama } from './routes/ollama.js';

const app = express();

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://murjan.my.id',
  process.env.FRONTEND_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // In a Netlify Serverless environment or development, origins might be loose or matched to ALLOWED_ORIGINS.
      // Netlify functions auto-handle CORS on same-domain.
      if (!origin || ALLOWED_ORIGINS.includes(origin) || origin.includes('netlify.app')) return cb(null, true);
      cb(new Error(`CORS: ${origin} not allowed`));
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json({ limit: '64kb' }));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests, please slow down.' },
});

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Chat rate limit reached. Please wait a moment.' },
});

app.use(globalLimiter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/api/chat/gemini', chatLimiter, chatGemini);
app.post('/api/chat/openrouter', chatLimiter, chatOpenRouter);
app.post('/api/chat/ollama', chatLimiter, chatOllama);

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

export default app;
