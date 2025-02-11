import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/api/chat"; // Change this if hosted in cloud

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Fetch chat history on mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error fetching chat history:", error));
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Show user message instantly
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ message: input }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.message, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setInput("");
    }
  };

  return (
    <div className="chat-container p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">AI Chat</h2>
      <div className="messages mb-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 rounded ${msg.sender === "user" ? "bg-blue-200" : "bg-gray-200"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border rounded-l"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
