import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("");

async function handleChatRequest(message, context) {
  try {
    // Use the correct model identifier
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Sanitize and prepare chat history
    let history = [];
    if (context && context.previousMessages) {
      history = context.previousMessages
        .filter((msg) => msg.role === "user" || msg.role === "model")
        .map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        }));
    }

    // Start a chat session with history
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    // Send user message
    const result = await chat.sendMessage(message);
    const response = result.response;

    // Extract text correctly
    const text = response.text() || "No response received.";

    return text;
  } catch (error) {
    console.error("Detailed error in chat request:", {
      message: error.message,
      status: error.status,
      details: error.errorDetails,
    });
    throw error;
  }
}

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message, context } = req.body;

    // Validate input
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await handleChatRequest(message, context || {});
    res.json({ response });
  } catch (error) {
    console.error("Error in chat route:", error);
    res.status(500).json({
      error: "Failed to process chat request",
      details: error.message,
    });
  }
});

router.post("/recommend", async (req, res) => {
  try {
    const { description, airQuality } = req.body;

    // Validate input
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Create a prompt that includes both the user description and air quality data
    const prompt = `Based on the following buyer description and air quality data, recommend the most suitable eco-friendly packaging solution. Consider both the buyer's needs and the environmental conditions.

Buyer Description: ${description}

Air Quality Data:
- AQI: ${airQuality.aqi}
- PM2.5: ${airQuality.components.pm2_5}
- PM10: ${airQuality.components.pm10}
- O3: ${airQuality.components.o3}
- NO2: ${airQuality.components.no2}
- CO: ${airQuality.components.co}

Provide your recommendation in valid JSON format with these exact fields:
{
  "recommendedProduct": "product name",
  "reason": "detailed explanation",
  "environmentalImpact": "how it helps with current air quality conditions"
}

Important: Respond with ONLY the JSON object, no additional text or formatting.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    try {
      console.log(text);
      // Clean the response text to ensure it's valid JSON
      const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
      const recommendation = JSON.parse(cleanText);
      res.json(recommendation);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Raw response:", text);
      res.status(500).json({
        error: "Failed to parse AI response",
        details: "The AI response was not in valid JSON format",
      });
    }
  } catch (error) {
    console.error("Error in recommendation route:", error);
    res.status(500).json({
      error: "Failed to generate recommendation",
      details: error.message,
    });
  }
});

export default router;
