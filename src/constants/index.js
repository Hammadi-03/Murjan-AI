export const MODELS = [
  { id: 'google/gemini-2.0-flash-lite:free', name: 'Lightning Flash (Zero Delay)', provider: 'OpenRouter' },
  { id: 'meta-llama/llama-3.1-8b-instruct:free', name: 'Llama 3.1 Fast', provider: 'OpenRouter' },
  { id: 'openrouter/free', name: 'Auto Optimizer (Smart)', provider: 'OpenRouter' },
  { id: 'gemini-1.5-flash', name: 'Google Cloud Power', provider: 'Google' },
  { id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC', name: 'Offline Browser Engine', provider: 'WebLLM' },
  { id: 'qwen2.5:7b', name: 'Local Power (Ollama)', provider: 'Ollama' },
];

export const DEFAULT_MODEL = 'google/gemini-2.0-flash-lite:free';

export const CHAT_STORAGE_KEY = 'murjan_chats';
