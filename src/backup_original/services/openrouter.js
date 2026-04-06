/**
 * OpenRouter service – calls our secure Express backend.
 * No API key is stored or used here; the backend manages it server-side
 * and handles all fallbacks safely.
 */



export const openrouterService = {
  /**
   * Streams an OpenRouter response via our backend proxy.
   *
   * @param {{ role: string, content: string }[]} messages
   * @param {string} modelId
   * @param {(accumulatedText: string) => void} onChunk
   */
  chatStream: async (messages, modelId, onChunk) => {
    const response = await fetch('/api/chat/openrouter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, modelId }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `Server error ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const lines = decoder.decode(value).split('\n');
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const raw = line.slice(6);
        if (raw === '[DONE]') continue;

        let parsed;
        try { parsed = JSON.parse(raw); } catch (_) { continue; }

        if (parsed.error) throw new Error(parsed.error);
        if (parsed.content) {
          fullContent += parsed.content;
          onChunk(fullContent);
        }
      }
    }

    return fullContent;
  },
};
