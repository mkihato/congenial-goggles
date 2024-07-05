import React, { useState, useEffect } from 'react';
import ChatBubble from '../whatsappChatbb/Chatbubble';
import axios from 'axios';
import './chats.css';

const Chats = () => {
  const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Fetch messages from your backend
//     axios.get('http://localhost:3005/api/messages')
//       .then(response => {
//         setMessages(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching messages:', error);
//       });
//   }, []);

  const handleClick = (message) => {
    // Handle click event and display the message in ChatBubble
    console.log(message);
  };

  return (
    <div className="chats-container">
      {messages.map((message, index) => (
        <div 
          key={index} 
          className="message-preview" 
          onClick={() => handleClick(message)}
        >
          <div className="avatar">📧</div>
          <div className="message-content">
            <h2>{message.from}</h2>
            <p>{message.snippet}</p>
          </div>
        </div>
      ))}
      <ChatBubble messages={messages} />
    </div>
  );
};

export default Chats;