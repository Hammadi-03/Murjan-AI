/**
 * Service for interacting with OpenRouter API
 */

const FALLBACK_MODELS = [
  "google/gemini-2.0-flash-lite:free", // Most stable
  "meta-llama/llama-3.3-70b-instruct:free", // High quality fallback
  "qwen/qwen-2.5-72b-instruct:free", // Stable alternative
  "google/gemini-flash-1.5-8b" // Reliable fallback
];

export const openrouterService = {
  /**
   * Generates a chat response with streaming using OpenRouter
   * Includes fallback logic to handle provider errors
   */
  chatStream: async (messages, apiKey, modelId, onChunk, systemInstruction) => {
    let currentModel = modelId || "openrouter/free";
    let attempts = 0;
    const maxAttempts = 3;
    const triedModels = new Set([currentModel]);

    // Add system instruction to message history
    const finalMessages = systemInstruction 
      ? [{ role: "system", content: systemInstruction }, ...messages]
      : messages;

    const runAttempt = async (model) => {
      if (!apiKey) {
        throw new Error("OpenRouter API Key is missing. Please add it to your .env file.");
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://murjan-ai.com",
          "X-Title": "Murjan AI",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": model,
          "messages": finalMessages,
          "stream": true,
          "temperature": 0.7,
        })
      });

      if (!response.ok) {
        let errorMsg = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.error?.message || errorMsg;
        } catch (e) {}
        throw new Error(errorMsg);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";
      let hasReceivedData = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              // Check for provider errors inside the stream
              if (parsed.error) {
                throw new Error(parsed.error.message || "Provider error");
              }
              
              const content = parsed.choices[0]?.delta?.content || "";
              if (content) {
                hasReceivedData = true;
                fullContent += content;
                onChunk(fullContent);
              }
            } catch (e) {
              if (e.message.includes("Provider") || e.message.includes("error")) {
                throw e; // Reraise to trigger fallback
              }
              console.error("Error parsing OpenRouter chunk", e);
            }
          }
        }
      }

      if (!hasReceivedData) {
        throw new Error("No data received from provider");
      }

      return fullContent;
    };

    while (attempts < maxAttempts) {
      try {
        attempts++;
        return await runAttempt(currentModel);
      } catch (error) {
        console.warn(`OpenRouter effort ${attempts} failed for model ${currentModel}:`, error.message);
        
        let finalError = error;
        // Check for common OpenRouter configuration errors
        if (
          error.message.includes("guardrail") || 
          error.message.includes("data policy") || 
          error.message.includes("User not found") ||
          error.message.includes("Provider returned error")
        ) {
          finalError = new Error("Account Setup Required: Please go to https://openrouter.ai/settings/privacy and ensure 'Data Sharing' is enabled for free models. Also, verify your API Key is active in your dashboard.");
          throw finalError; // Don't fallback for account setting errors
        }

        // If it's a provider error and we have fallbacks left
        if (attempts < maxAttempts) {
          const nextModel = FALLBACK_MODELS.find(m => !triedModels.has(m));
          if (nextModel) {
            currentModel = nextModel;
            triedModels.add(currentModel);
            console.log(`Switching to fallback model: ${currentModel}`);
            continue; 
          }
        }
        
        throw finalError;
      }
    }
  }
};
