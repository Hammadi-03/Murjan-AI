/**
 * Ollama service – calls our secure Express backend.
 */

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export const ollamaService = {
  /**
   * Generates a chat response with streaming
   */
  chatStream: async (messages, modelId = 'qwen2.5:7b', onChunk) => {
    try {
      const response = await fetch(`${BACKEND}/api/chat/ollama`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          modelId,
          messages,
        })
      });

      if (!response.ok) {
        let msg = `Ollama error: ${response.status} ${response.statusText}`;
        try {
          const errData = await response.json();
          msg = errData.error || msg;
        } catch (_) {}
        throw new Error(msg);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

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
    } catch (error) {
      console.error("Ollama Streaming Error:", error);
      throw error;
    }
  }
};
