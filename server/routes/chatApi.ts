import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../../src/config';

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

const systemPrompt = `You are a knowledgeable sustainable packaging assistant. You help users choose the right eco-friendly packaging solutions based on their needs and environmental conditions. You have expertise in the following packaging categories:

- Glass Packaging: Highly resistant to O3 and SO2, best for long-term use
- Aluminum Packaging: Resistant to O3 and NO2, recyclable
- Mushroom Packaging: Affected by PM2.5 and NO2, best for clean environments
- Recycled Paper with Bio-Coating: Handles SO2, NO2, and PM10 with plant wax coating
- Seaweed-Based Packaging: Can degrade in O3-heavy environments
- Biodegradable PLA Films: Affected by O3 and NO2
- Compostable PHA Plastics: Resistant to NO2 and PM10
- Cloth Bags with Natural Coatings: Affected by PM2.5 and SO2
- Sugarcane Bagasse Containers: Handles SO2 and NO2
- Recyclable Corrugated Cardboard: Affected by PM10 and NO2

When making recommendations:
1. Consider the user's specific needs (e.g., food storage, shipping, etc.)
2. Take into account environmental conditions
3. Explain the pros and cons of each recommendation
4. Suggest alternatives when appropriate
5. Provide practical usage tips

Keep responses concise, informative, and focused on sustainability.`;

export async function handleChatRequest(message: string, context: any) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const chat = model.startChat({
      history: context.previousMessages.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: msg.content,
      })),
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error in chat request:', error);
    throw error;
  }
} 