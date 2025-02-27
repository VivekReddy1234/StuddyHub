import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Send, User, UserRound } from 'lucide-react';

const socket = io('http://localhost:3000');

const Chat = () => {
  const [activeUser, setActiveUser] = useState('user1');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (messageInput.trim() === '') return;
    
    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: activeUser,
      timestamp: new Date()
    };

    socket.emit('message', newMessage);
    setMessageInput('');
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleUser = () => {
    setActiveUser(activeUser === 'user1' ? 'user2' : 'user1');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <UserRound className="h-6 w-6" />
            <h1 className="text-xl font-bold">Chat Room</h1>
          </div>
          <button 
            onClick={toggleUser}
            className="bg-indigo-500 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm flex items-center"
          >
            <User className="h-4 w-4 mr-1" />
            {activeUser === 'user1' ? 'User 1' : 'User 2'}
          </button>
        </div>
        
        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 flex ${message.sender === activeUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs rounded-lg px-4 py-2 ${
                  message.sender === activeUser 
                    ? 'bg-indigo-500 text-white rounded-br-none' 
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === activeUser ? 'text-indigo-100' : 'text-gray-500'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        
        {/* Status */}
        <div className="bg-gray-100 px-4 py-2 text-sm text-gray-500">
          Currently chatting as: <span className="font-semibold">{activeUser === 'user1' ? 'User 1' : 'User 2'}</span>
        </div>
      </div>
    </div>
  );
}

export default Chat;