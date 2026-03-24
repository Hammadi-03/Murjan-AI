
import { handle } from 'hono/cloudflare-pages';
import app from '../../server/app.js';

export const onRequest = handle(app);
export function onRequest(context) {
  return new Response("Hello, Murjan is ready for AI!");
}