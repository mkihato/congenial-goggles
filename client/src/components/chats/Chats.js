import React, { useState } from 'react';
import ChatBubble2 from './ChatBubble2';
import './chats.css';

const Chats = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', isSent: false },
    { text: 'I have a question about my order.', isSent: true },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isSent: true }]);
      setInput('');
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
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
              </div>
    </div>
  );
};

export default Chats;
