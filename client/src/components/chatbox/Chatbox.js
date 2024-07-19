import React, { useState } from 'react';
// import io from "socket.io-client";
import './chatbox.css';
import ChatBubble from '../chatbubble/Chatbubble';
import axios from 'axios';


// const socket= io.connect("http://localhost:3001");


const ChatBox = ({setnewMessage}) => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
  
  // const [sendMessage, setsendMessage] = useState('');

  // const [messages, setMessages] = useState([
  //   { text: 'Hello! How are you?', isSent: false },
  //   { text: 'I am good, thank you!', isSent: true },
  // ]);
  // setMessages({text: setnewMessage, isSent:true})
   

  const handleInputChange = (e) => {
    setText(e.target.value);
    
  };

  const handleSendMessage = async() => {
    if (!to || !subject || !text) {
      alert('All fields are required');
      return;
  }

  try {
      await axios.post('https://api.telvoip.io/send-email', {
          to,
          subject,
          text
      });
      console.log('Email sent successfully');
      setTo('');
      setSubject('');
      setText('');
  } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
  }

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
      <div className="email-form">
            <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Recipient email"
            />
            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
            />
        </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          onKeyDown={handleKeyPress}
          value={text}
          onChange={handleInputChange}
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
