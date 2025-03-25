import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, MinusCircle, Maximize2 } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

interface ChatBotProps {
  categories: string[];
  onClose: () => void;
}

const predefinedQuestions = [
  "What eco-friendly packaging options do you recommend for food items?",
  "Which packaging material is best for shipping fragile items?",
  "Can you suggest packaging solutions for areas with high humidity?",
  "What are the most cost-effective sustainable packaging options?",
  "How do different pollutants affect packaging materials?",
];

const ChatBot: React.FC<ChatBotProps> = ({ categories, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hello! I'm your sustainable packaging assistant. I can help you choose the right eco-friendly packaging solutions. Feel free to ask me anything or select from the suggested questions below.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateGeminiResponse = async (userMessage: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          context: {
            categories: categories,
            previousMessages: messages,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from Gemini");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error generating response:", error);
      return "I apologize, but I encountered an error. Please try again later.";
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newUserMessage: Message = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);

    const botResponse = await generateGeminiResponse(message);

    const newBotMessage: Message = {
      role: "bot",
      content: botResponse,
    };

    setMessages((prev) => [...prev, newBotMessage]);
    setIsLoading(false);
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-xl overflow-hidden ${
        isMinimized ? "w-16 h-16" : "w-96 max-h-[calc(100vh-8rem)]"
      } transition-all duration-300 flex flex-col`}
      style={{
        maxWidth: "calc(100vw - 2rem)",
        height: isMinimized ? "4rem" : "calc(100vh - 8rem)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-dark-teal text-white p-4 rounded-t-lg">
        {!isMinimized && (
          <div className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            <span className="font-semibold">Packaging Assistant</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:text-emerald-200 transition-colors"
            aria-label={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? (
              <Maximize2 className="h-5 w-5" />
            ) : (
              <MinusCircle className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={onClose}
            className="hover:text-emerald-200 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-emerald-600 text-white rounded-tr-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg p-3 border border-gray-200 rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Predefined Questions */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <p className="text-sm text-gray-600 mb-2">Suggested Questions:</p>
            <div className="flex flex-wrap gap-2">
              {predefinedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 py-1 px-2 rounded-full transition-colors whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
                  title={question}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSendMessage(inputMessage)
                }
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;
