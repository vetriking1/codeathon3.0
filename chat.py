from flask import Flask, request, jsonify
import ollama

app = Flask(__name__)

# Store conversation history for each user session (basic implementation, consider using a database for production)
conversation_history = {}

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_id = data.get("user_id")  # Unique identifier for users
    user_message = data.get("message")
    
    if not user_id or not user_message:
        return jsonify({"error": "Missing user_id or message"}), 400
    
    # Initialize conversation history if not exists
    if user_id not in conversation_history:
        conversation_history[user_id] = [
            {"role": "system", "content": "You are a helpful assistant. Your primary focus is to promote biodegradable products and sustainable packaging solutions. Provide information about eco-friendly materials, recycling processes, and the benefits of reducing plastic waste."}
        ]
    
    # Add user message to conversation history
    conversation_history[user_id].append({"role": "user", "content": user_message})
    
    # Get response from Ollama
    response = ollama.chat("llama3.2", messages=conversation_history[user_id])
    assistant_message = response["message"]["content"]
    
    # Add assistant response to history
    conversation_history[user_id].append({"role": "assistant", "content": assistant_message})
    
    return jsonify({"response": assistant_message})

if __name__ == "__main__":
    app.run(debug=True)