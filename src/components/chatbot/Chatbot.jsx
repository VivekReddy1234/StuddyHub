import { useState, useRef, useEffect } from "react";
import Picker from "@emoji-mart/react"; // Import Emoji Picker
import data from "@emoji-mart/data"; // Emoji data

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hey there 👋\nHow can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const chatBodyRef = useRef(null);

  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyBM5tuC6VQt_rDnVtpjCVUcqpX25Nnwg-w`;

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() && !file) return;

    const userMessage = { text: input, sender: "user", file };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setFile(null);

    setMessages((prev) => [
      ...prev,
      { text: "Thinking...", sender: "bot", loading: true },
    ]);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: input }] }] }),
      });

      const data = await response.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't respond.";
      setMessages((prev) =>
        prev.map((msg) => (msg.loading ? { text: botReply, sender: "bot" } : msg))
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) => (msg.loading ? { text: "Error fetching response", sender: "bot" } : msg))
      );
    }
  };

  useEffect(() => {
    chatBodyRef.current?.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className=" flex mt-32 justify-center items-center">
      {showChat && (
        <div className="w-96 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center bg-indigo-700 p-4 justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full p-1">
                <svg className="w-full h-full text-indigo-700" viewBox="0 0 1024 1024">
                  <path fill="currentColor" d="..." />
                </svg>
              </div>
              <h2 className="text-white text-lg font-semibold">Chatbot</h2>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-white text-2xl hover:bg-indigo-900 rounded-full p-1"
            >
              ⬇️
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-96 overflow-y-auto space-y-4" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : ""}`}>
                <div
                  className={`p-3 max-w-xs rounded-lg ${
                    msg.sender === "user" ? "bg-indigo-700 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.file && <img src={URL.createObjectURL(msg.file)} alt="attachment" className="w-24 mb-2 rounded-lg" />}
                  {msg.text.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={sendMessage} className="p-4 bg-gray-100 flex items-center gap-2 relative">
            <textarea
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message..."
            />
            <input type="file" className="hidden" id="fileInput" onChange={(e) => setFile(e.target.files[0])} />
            <label htmlFor="fileInput" className="cursor-pointer">📎</label>

            {/* Emoji Picker Toggle */}
            <button
              type="button"
              onClick={() => setShowEmojis(!showEmojis)}
              className="text-xl"
            >
              😀
            </button>

            {/* Send Button */}
            <button
              type="submit"
              className="bg-indigo-700 text-white p-2 rounded-lg hover:bg-indigo-800"
            >
              ➤
            </button>

            {/* Emoji Picker */}
            {showEmojis && (
              <div className="absolute bottom-14 right-4 bg-white shadow-lg rounded-lg">
                <Picker
                  data={data}
                  onEmojiSelect={(emoji) => setInput((prev) => prev + emoji.native)}
                />
              </div>
            )}
          </form>
        </div>
      )}

      {/* Show Chat Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="bg-indigo-700 text-white p-3 rounded-full shadow-lg text-2xl"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;
