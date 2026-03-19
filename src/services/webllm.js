import * as webllm from "@mlc-ai/web-llm";

let engine = null;

export const webllmService = {
  /**
   * Initializes the WebLLM engine with a specific model
   */
  init: async (modelId, onProgress) => {
    if (engine) return engine;

    engine = new webllm.MLCEngine();
    engine.setInitProgressCallback((report) => {
      if (onProgress) onProgress(report.text, report.progress);
    });

    await engine.reload(modelId);
    return engine;
  },

  /**
   * Generates a chat response with streaming using WebLLM
   */
  chatStream: async (messages, modelId, onChunk, onProgress) => {
    try {
      // Ensure engine is loaded
      if (!engine) {
        await webllmService.init(modelId, onProgress);
      }

      const reply = await engine.chat.completions.create({
        messages: messages,
        stream: true,
      });

      let fullContent = "";
      for await (const chunk of reply) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          fullContent += content;
          onChunk(fullContent);
        }
      }

      return fullContent;
    } catch (error) {
      console.error("WebLLM Error:", error);
      throw error;
    }
  }
};
