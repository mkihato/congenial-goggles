import React, { useState } from 'react';
// import io from "socket.io-client";
import './chatbox.css';
import ChatBubble from '../chatbubble/Chatbubble';
import axios from 'axios';


// const socket= io.connect("http://localhost:3001");


const ChatBox = ({setnewMessage}) => {
  
  const [sendMessage, setsendMessage] = useState('');

  const [messages, setMessages] = useState([
    { text: 'Hello! How are you?', isSent: false },
    { text: 'I am good, thank you!', isSent: true },
  ]);
  // setMessages({text: setnewMessage, isSent:true})
   

  const handleInputChange = (e) => {
    setsendMessage(e.target.value);
    
  };

  const handleSendMessage = async() => {
    

    try {
      await axios.post('https://api.telvoip.io/sendMessage',{sendMessage});
      setsendMessage('')
      setMessages([...messages, { text: sendMessage, isSent: true }]);

    } catch (error) {
      console.error('Error sending message:', error);
    }

     
    
    // if (message.trim()) {
    //   setMessages([...messages, { text: message, isSent: true }]);
    //   setMessage('');
    // }
    
    
    
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
      <ChatBubble message={setnewMessage} isSent={false} />
      {/* {messages.map((msg, index) => (
          
        ))} */}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          onKeyDown={handleKeyPress}
          value={sendMessage}
          onChange={handleInputChange}
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
