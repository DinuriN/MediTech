// frontend/src/Components/ChatBot.js
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  // Get equipment data from navigation state
  const equipment = location.state?.equipment || null;
  
  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Add initial welcome message
  useEffect(() => {
    let welcomeMsg = "Hello! I'm your lab equipment troubleshooting assistant. Please describe the issue you're experiencing.";
    if (equipment) {
      welcomeMsg = `Hello! I'm your lab equipment troubleshooting assistant. I see you're working with ${equipment.name}. Please describe the issue you're experiencing.`;
    }
    
    setMessages([{
      sender: 'bot',
      content: welcomeMsg
    }]);
  }, [equipment]);
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { sender: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      // Send message to backend
      const response = await axios.post('http://localhost:5000/api/chatbot/chat', {
        message: input,
        equipmentId: equipment?._id
      });
      
      // Add bot response to chat
      if (response.data.success) {
        const steps = response.data.message
          .split(/\n\s*\n|(?=Step \d+:)/g) // Split by double newline or "Step X:"
          .map(step => step.trim())
          .filter(step => step.length > 0);
  
        // Add each step as a separate bot message
        setMessages(prev => [
          ...prev,
          ...steps.map(step => ({
            sender: 'bot',
            content: step
          }))
        ]);
      } else {
        throw new Error(response.data.message || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        sender: 'bot',
        content: "Sorry, I encountered an error. Please try again later."
      }]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <h2>Equipment Troubleshooting Assistant</h2>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <div className="message-content loading">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button 
          onClick={handleSendMessage}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;