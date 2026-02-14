
import { GoogleGenAI } from "@google/genai";

// Refine the user message into a poetic, high-end editorial style using Gemini 3 Flash
export const refineMessage = async (currentMessage: string): Promise<string> => {
  try {
    // Initialize GoogleGenAI with the API key from environment variables
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Rewrite the following message for a matrimony bouquet card. It should be poetic, sincere, and follow a high-end editorial, minimal style. Keep it under 50 words. Message: "${currentMessage}"`,
    });

    // Return the generated text property directly (do not call as a method)
    return response.text || currentMessage;
  } catch (error) {
    console.error("Gemini refinement failed:", error);
    return currentMessage;
  }
};
