import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the Gemini AI client
// Note: This relies on the environment variable process.env.API_KEY being set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const MODEL_NAME = 'gemini-2.5-flash';

export const generateSmartReply = async (messageHistory: string[]): Promise<string> => {
  if (!process.env.API_KEY) return "AI services unavailable (Missing API Key)";

  try {
    const prompt = `
      You are a smart reply assistant for a chat app called VinaChat.
      Based on the last few messages, suggest 3 short, relevant, and culturally appropriate (Vietnamese context) replies.
      Return them as a comma-separated list.
      Conversation:
      ${messageHistory.join('\n')}
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || '';
  } catch (error) {
    console.error("Gemini Smart Reply Error:", error);
    return "";
  }
};

export const chatWithBot = async (userMessage: string): Promise<string> => {
  if (!process.env.API_KEY) return "I can't connect to my brain right now. Please check your API Key configuration.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: userMessage,
      config: {
        systemInstruction: "You are Vina AI, a helpful, friendly assistant within the VinaChat messaging app. You are helpful, polite, and can speak both English and Vietnamese fluently. Keep responses concise and suitable for a chat interface.",
      }
    });

    return response.text || "I'm not sure how to respond to that.";
  } catch (error) {
    console.error("Gemini Bot Error:", error);
    return "Sorry, I'm having trouble connecting right now.";
  }
};
