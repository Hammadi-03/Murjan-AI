import { GoogleGenAI, ThinkingLevel } from '@google/genai';

/**
 * Service for interacting with Google Gemini API (new @google/genai SDK)
 */
export const geminiService = {
  /**
   * Generates a chat response with streaming using Gemini
   */
  chatStream: async (messages, apiKey, modelId, onChunk) => {
    try {
      if (!apiKey) {
        throw new Error("Gemini API Key is missing. Please check your .env file.");
      }

      const ai = new GoogleGenAI({ apiKey });

      // Build tools
      const tools = [
        { urlContext: {} },
        { codeExecution: {} },
      ];

      // Choose thinking level based on model
      const isThinkingModel = modelId.includes('flash-preview') || modelId.includes('thinking');

      const config = {
        tools,
        ...(isThinkingModel && {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          }
        })
      };

      // Convert message history to Gemini format
      const contents = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

      const response = await ai.models.generateContentStream({
        model: modelId,
        config,
        contents,
      });

      let fullContent = '';

      for await (const chunk of response) {
        if (!chunk.candidates?.[0]?.content?.parts) continue;

        const parts = chunk.candidates[0].content.parts;

        for (const part of parts) {
          if (part.text) {
            fullContent += part.text;
            onChunk(fullContent);
          }
          if (part.executableCode) {
            const codeBlock = `\n\`\`\`${part.executableCode.language?.toLowerCase() || ''}\n${part.executableCode.code}\n\`\`\`\n`;
            fullContent += codeBlock;
            onChunk(fullContent);
          }
          if (part.codeExecutionResult) {
            const resultBlock = `\n**Output:**\n\`\`\`\n${part.codeExecutionResult.output}\n\`\`\`\n`;
            fullContent += resultBlock;
            onChunk(fullContent);
          }
        }
      }

      return fullContent;
    } catch (error) {
      console.error("Gemini Error:", error);
      if (error.message?.includes("API_KEY_INVALID") || error.message?.includes("API key not valid")) {
        throw new Error("Invalid Gemini API Key. Please check your .env file and ensure the key is correct.");
      }
      if (error.message?.includes("RESOURCE_EXHAUSTED") || error.message?.includes("quota")) {
        throw new Error("Gemini API quota exceeded. Please wait a moment or upgrade your plan.");
      }
      if (error.message?.includes("not found") || error.message?.includes("404")) {
        throw new Error(`Model '${error.message}' is not available. Try selecting a different model.`);
      }
      throw error;
    }
  }
};
