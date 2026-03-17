export const MODELS = [
  { id: 'openrouter/free', name: 'Murjan AI (OpenAI)', provider: 'OpenRouter' },
  { id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC', name: 'Murjan AI (Browser Built-in Ai)', provider: 'WebLLM' },
  { id: 'qwen3-coder:480b-cloud', name: 'Qwen 3 Coder (Local)', provider: 'Ollama' },
];

export const DEFAULT_MODEL = 'openrouter/free';




export const CHAT_STORAGE_KEY = 'murjan_chats';
