/**
 * Murjan AI – Secure Express Backend
 *
 * Responsibilities:
 *  - Hold API keys SERVER-SIDE only (never sent to the browser)
 *  - Validate every piece of user input before touching it
 *  - Rate-limit every public endpoint (stricter limits for sensitive routes)
 *  - Proxy requests to Gemini, OpenRouter, and Ollama
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { chatGemini } from './routes/gemini.js';
import { chatOpenRouter } from './routes/openrouter.js';
import { chatOllama } from './routes/ollama.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ─── CORS ────────────────────────────────────────────────────────────────────
// Only allow requests from our own Vite dev server (or the deployed origin)
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow tools like curl / Postman in dev, or same-origin requests
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      cb(new Error(`CORS: ${origin} not allowed`));
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// ─── BODY PARSER ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '64kb' })); // Hard cap – prevents huge payloads

// ─── RATE LIMITERS ───────────────────────────────────────────────────────────
/**
 * Global limiter – every public endpoint.
 * 100 requests per 15 minutes per IP.
 */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests, please slow down.' },
});

/**
 * Strict limiter – AI chat endpoints (they are expensive and rate-limited
 * by the upstream providers anyway).
 * 20 requests per minute per IP.
 */
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Chat rate limit reached. Please wait a moment.' },
});

/**
 * Extra-strict limiter – reserved for any "login"-style or key-verification
 * endpoint. 5 requests per 15 minutes per IP.
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many auth attempts. Try again in 15 minutes.' },
});

// Apply the global limiter to every route
app.use(globalLimiter);

// ─── HEALTH CHECK ────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// ─── AI ROUTES ───────────────────────────────────────────────────────────────
app.post('/api/chat/gemini',      chatLimiter, chatGemini);
app.post('/api/chat/openrouter',  chatLimiter, chatOpenRouter);
app.post('/api/chat/ollama',      chatLimiter, chatOllama);

// Future auth route placeholder (tighter limiter example)
// app.post('/api/auth/login', authLimiter, loginHandler);

// ─── GLOBAL ERROR HANDLER ────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err.message);
  // Never leak a stack trace to the client
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ Murjan AI backend running on http://localhost:${PORT}`);
  if (!process.env.GEMINI_API_KEY)      console.warn('⚠️  GEMINI_API_KEY is not set');
  if (!process.env.OPENROUTER_API_KEY)  console.warn('⚠️  OPENROUTER_API_KEY is not set');
});
