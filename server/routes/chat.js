import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyD6dSCWYv5L1FjgHe4XIVJz7EK13_art1I");

async function handleChatRequest(message, context) {
  try {
    // Use the correct model identifier
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

export default router;
