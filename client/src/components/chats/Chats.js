import React, { useState } from 'react';
import ChatBubble2 from './ChatBubble2';
import './chats.css';
import axios from "axios"


const Chats = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', isSent: false },
    { text: 'I have a question about my order.', isSent: true },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async() => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isSent: true }]);
      setInput('');
    }
    try {
      await axios.post('https://api.telvoip.io/sendMessage',{sendMessage});
      // setsendMessage('')
      setMessages([...messages, { text: sendMessage, isSent: true }]);

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chats-container">
      <div className="chat-area">
        {messages.map((message, index) => (
          <ChatBubble2 key={index} message={message.text} isSent={message.isSent} />
        ))}
      </div>
      <div className="input-area">
                <input
                  type="text"
                  value={input}
                  onKeyDown={handleKeyPress}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
              </div>
    </div>
  );
};

export default Chats;
