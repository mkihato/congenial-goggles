import React from 'react';
import './Chatbubble.css';

const ChatBubble = ({ messages }) => {
  return (
    <div className="chat-bubble-container">
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`chat-bubble ${message.sender === 'me' ? 'sent' : 'received'}`}
        >
          <div className="message">
            <p>{message.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBubble;