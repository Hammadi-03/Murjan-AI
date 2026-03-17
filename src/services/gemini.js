import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Service for interacting with Google Gemini API (Cloud)
 */
export const geminiService = {
  /**
   * Generates a chat response with streaming using Gemini
   */
  chatStream: async (messages, apiKey, modelId, onChunk, systemInstruction) => {
    try {
      if (!apiKey) {
        throw new Error("Gemini API Key is missing. Please add it to your environment or settings.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      
      // Configuration for Thinking and Tools
      const isThinkingModel = modelId.includes('thinking');
      
      const modelConfig = {
        model: modelId,
      };

      if (systemInstruction) {
        modelConfig.systemInstruction = systemInstruction;
      }

      // Add Google Search and Code Execution to match your Python snippet
      const tools = [
        { googleSearch: {} },
        { codeExecution: {} }
      ];

      const model = genAI.getGenerativeModel(modelConfig);

      // Format history properly for Gemini
      const history = messages.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

      const userMessage = messages[messages.length - 1].content;

      const generationConfig = isThinkingModel ? {
        thinkingConfig: { includeThoughts: true }
      } : {};

      const chat = model.startChat({
        history: history,
        generationConfig,
        tools: tools,
      });

      const result = await chat.sendMessageStream(userMessage);
      
      let fullContent = "";
      try {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          if (chunkText) {
            fullContent += chunkText;
            onChunk(fullContent);
          }
        }
      } catch (streamError) {
        console.error("Stream Error:", streamError);
        if (fullContent) return fullContent; // Return partial content if stream fails
        throw streamError;
      }
      
      return fullContent;
    } catch (error) {
      console.error("Gemini API Error Detail:", error);
      
      // Provide more helpful error messages for the user
      let userFriendlyError = error.message;
      
      if (error.message.includes("429")) {
        userFriendlyError = "Google Quota Exceeded. Please wait 1 minute and try again (Free tier limit).";
      } else if (error.message.includes("403")) {
        userFriendlyError = "This API Key is BLOCKED. Please ensure 'Generative Language API' is enabled in Google AI Studio or try a fresh key.";
      } else if (error.message.includes("404") || error.message.includes("not found")) {
        userFriendlyError = `The model '${modelId}' was not found. Your region might not support this specific version yet.`;
      } else if (error.message.includes("API key not valid")) {
        userFriendlyError = "Your API Key is invalid. Please double check the .env file.";
      }
      
      throw new Error(userFriendlyError);
    }
  }
};


