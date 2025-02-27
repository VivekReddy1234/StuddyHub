import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
import { format } from 'date-fns';
import { Send, RefreshCw, MessageSquare, AlertCircle, MessageCircle } from 'lucide-react';

const See = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Welcome to our community forum! This is a space for sharing ideas and connecting with others.',
      author: 'Admin',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      text: 'Feel free to introduce yourself and share your thoughts on any topic that interests you.',
      author: 'Moderator',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: '3',
      text: 'Remember to be respectful and considerate of others in our diverse community.',
      author: 'Guide',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('Guest');
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, this would fetch from your actual API
        // const response = await axios.get('/api/messages');
        // setMessages(response.data);
        
        // For demo purposes, we'll use the initial state
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const tempMessage = {
      id: Date.now().toString(),
      text: newMessage,
      author: username,
      avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80`,
      timestamp: new Date().toISOString(),
    };

    // Optimistically add the message
    setMessages([...messages, tempMessage]);
    setNewMessage('');

    try {
      // In a real app, this would post to your actual API
      // const response = await axios.post('/api/messages', { text: newMessage, author: username });
      // Update with the actual response if needed
      // setMessages(messages => messages.map(msg => msg.id === tempMessage.id ? response.data : msg));
    } catch (err) {
      console.error('Error posting message:', err);
      setError('Failed to post your message. Please try again.');
      // Remove the optimistically added message on error
      setMessages(messages => messages.filter(msg => msg.id !== tempMessage.id));
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would fetch from your actual API
      // const response = await axios.get('/api/messages');
      // setMessages(response.data);
      
      // For demo purposes, we'll just wait a bit
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    } catch (err) {
      console.error('Error refreshing messages:', err);
      setError('Failed to refresh messages. Please try again later.');
      setIsLoading(false);
    }
  };

  const formatMessageTime = (timestamp) => {
    try {
      return format(new Date(timestamp), 'MMM d, h:mm a');
    } catch (err) {
      return 'Unknown time';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center p-4 md:p-8">
      <header className="w-full max-w-4xl mb-6 flex items-center justify-center">
        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md">
          <MessageCircle className="text-indigo-600 h-6 w-6" />
          <h1 className="text-2xl font-bold text-gray-800">Community Forum</h1>
        </div>
      </header>
      
      <main className="w-full max-w-4xl flex-1">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col h-[80vh]">
          <div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Community Messages</h2>
            </div>
            <button 
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-2 rounded-full hover:bg-indigo-500 transition-colors"
              aria-label="Refresh messages"
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white rounded-lg shadow p-4 transition-all hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <img 
                        src={msg.avatar} 
                        alt={`${msg.author}'s avatar`} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-medium text-indigo-900">{msg.author}</h3>
                          <span className="text-xs text-gray-500">{formatMessageTime(msg.timestamp)}</span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-line">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500 text-center">No messages yet. Be the first to post!</p>
              </div>
            )}
          </div>
          
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="mb-4 flex items-center gap-2">
              <label htmlFor="username" className="text-sm text-gray-600">Posting as:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-sm border-b border-gray-300 px-2 py-1 focus:border-indigo-500 focus:outline-none"
                placeholder="Your name"
              />
            </div>
            
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                placeholder="Share your thoughts..."
              />
              <button 
                type="submit" 
                disabled={!newMessage.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Send</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </main>
      
      <footer className="w-full max-w-4xl mt-8 text-center text-sm text-gray-500">
        <p>© 2025 Community Forum. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default See;