import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FireBaseContext } from "../firebase/Context";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import sign1 from "../assets/sign1.jpg";
import sign2 from "../assets/sign2.jpg";
import sign3 from "../assets/sign3.jpg";
import sign4 from "../assets/sign4.jpg";

const SignInChat = () => {
  const navigate = useNavigate();
  const { SignUpEmail, SignIn } = useContext(FireBaseContext);
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [messages, setMessages] = useState([
    { text: "Hey there 👋\nHow can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const chatBodyRef = useRef(null);

  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY`;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    chatBodyRef.current?.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSignIn = () => {
    SignIn(email, password, role)
      .then(() => navigate("/"))
      .catch((error) => console.error("Error signing in:", error));
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() && !file) return;
    setMessages((prev) => [...prev, { text: input, sender: "user", file }]);
    setInput("");
    setFile(null);
    setMessages((prev) => [...prev, { text: "Thinking...", sender: "bot", loading: true }]);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: input }] }] }),
      });
      const data = await response.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't respond.";
      setMessages((prev) => prev.map((msg) => (msg.loading ? { text: botReply, sender: "bot" } : msg)));
    } catch {
      setMessages((prev) => prev.map((msg) => (msg.loading ? { text: "Error fetching response", sender: "bot" } : msg)));
    }
  };

  return (
    <>
      {/* Sign-In Section */}
      <div className="fixed inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${[sign1, sign2, sign3, sign4][backgroundIndex]})` }}>
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white p-8 rounded-lg bg-black/50 shadow-lg w-96">
            <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>
            <label className="block mt-4">
              Email:
              <input
                type="email"
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block mt-2">
              Role:
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                placeholder="admin or user"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </label>
            <label className="block mt-2">
              Password:
              <input
                type="password"
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button onClick={handleSignIn} className="mt-4 w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800">
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Chatbot Section */}
      <div className="fixed bottom-5 right-5">
        {showChat && (
          <div className="w-96 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center bg-indigo-700 p-4 justify-between">
              <h2 className="text-white text-lg font-semibold">Chatbot</h2>
              <button onClick={() => setShowChat(false)} className="text-white text-2xl hover:bg-indigo-900 rounded-full p-1">
                ⬇️
              </button>
            </div>

            <div className="p-4 h-96 overflow-y-auto space-y-4" ref={chatBodyRef}>
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : ""}`}>
                  <div className={`p-3 max-w-xs rounded-lg ${msg.sender === "user" ? "bg-indigo-700 text-white" : "bg-gray-200 text-gray-800"}`}>
                    {msg.file && <img src={URL.createObjectURL(msg.file)} alt="attachment" className="w-24 mb-2 rounded-lg" />}
                    {msg.text.split("\n").map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                </div>
              ))}
            </div>

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
              <button type="button" onClick={() => setShowEmojis(!showEmojis)} className="text-xl">😀</button>
              <button type="submit" className="bg-indigo-700 text-white p-2 rounded-lg hover:bg-indigo-800">➤</button>
              {showEmojis && <Picker data={data} onEmojiSelect={(emoji) => setInput((prev) => prev + emoji.native)} />}
            </form>
          </div>
        )}
        {!showChat && <button onClick={() => setShowChat(true)} className="bg-indigo-700 text-white p-3 rounded-full shadow-lg text-2xl">💬</button>}
      </div>
    </>
  );
};

export default SignInChat;
