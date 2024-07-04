import React from 'react';
import './chatbubble.css';

const ChatBubble = ({ message, isSent }) => {
  return (
    <div className={`chat-bubble ${isSent ? 'sent' : 'received'}`}>
      <p>{message}</p>
    </div>
  );
};

export default ChatBubble;
