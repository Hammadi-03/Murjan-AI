
import { handle } from 'hono/cloudflare-pages';
import app from '../../server/app.js';

export function onRequest(context) {
  return new Response("Hello, Murjan is ready for AI!");
}