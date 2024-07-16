
import React from 'react';
import './ChatBubble2.css';

const ChatBubble2 = ({ message, isSent }) => {
  return (


    <div className={`chat-bubble2 ${isSent ? 'sent' : 'received'}`}>
      <p>{message}</p>
      {/* <span>4:20 p.m</span> */}
    </div>
  );
};

export default ChatBubble2;
