/**
 * Service for interacting with Ollama API
 */
export const ollamaService = {
  /**
   * Generates a chat response (non-streaming)
   */
  chat: async (messages, model = 'qwen3.5:9b') => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages,
          stream: false
        })
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Model '${model}' not found. Please run 'ollama pull ${model}' in your terminal.`);
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }


      const data = await response.json();
      return data.message?.content || data.response || "No response generated.";
    } catch (error) {
      console.error("Ollama API Error:", error);
      throw error;
    }
  },

  /**
   * Generates a chat response with streaming
   */
  chatStream: async (messages, model = 'qwen3.5:9b', onChunk, systemInstruction) => {
    try {
      const finalMessages = systemInstruction 
        ? [{ role: "system", content: systemInstruction }, ...messages]
        : messages;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages: finalMessages,
          stream: true
        })
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Model '${model}' not found. Please run 'ollama pull ${model}' in your terminal.`);
        }
        throw new Error(`Ollama error: ${response.status} ${response.statusText}`);
      }


      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const data = JSON.parse(line);
            if (data.message?.content) {
              fullContent += data.message.content;
              onChunk(fullContent);
            }
            if (data.done) break;
          } catch (e) {
            console.warn("Error parsing chunk:", e);
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
