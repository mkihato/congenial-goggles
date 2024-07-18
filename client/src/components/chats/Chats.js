import React, { useState,useEffect } from 'react';
import ChatBubble2 from './ChatBubble2';
import './chats.css';
import axios from 'axios';
import io from "socket.io-client"

const SOCKET_URL=`https://api.telvoip.io`;

const Chats = ({setnewMessage}) => {
  const [sendMessage, setsendMessage] = useState('');

  const [messages, setMessages] = useState([
    { text: 'Hello! How are you?', isSent: false },
    { text: 'I am good, thank you!', isSent: true },
  ]);
  
  
  const handleInputChange = (e) => {
    setsendMessage(e.target.value);
    
  };
  const handleSendMessage = async() => {
    const socket= io(SOCKET_URL)
   
    
    if (sendMessage.trim() !== '') {
      const newMessage = { text: sendMessage, isSent: true,id: Date.now() };
      setMessages([...messages, newMessage]);
      setsendMessage(''); // Clear the input field
      

    try {
      await axios.post('https://api.telvoip.io/sendMessage',{sendMessage});
      socket.emit('sent_message', newMessage);

    } catch (error) {
      console.error('Error sending message:', error);
    }
    
  }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  
   
  

  // Simulate receiving messages for demonstration purposes
  useEffect(() => {

    const socket= io(SOCKET_URL);

    socket.on('connect', ()=>{
      console.log('connected to socket server')
    })

    socket.on('newMessage',(message)=>{

      const receiveMessage = (message) => {
        const newMessage = { text: message, isSent: false };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
      receiveMessage(message);
      // console.log(`new message received: ${message}`)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    return () => {
      socket.disconnect();
    };
    // const interval = setInterval(() => {
    //   receiveMessage('This is a received message.');
    // }, 10000); // Simulate receiving a message every 10 seconds

    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="chats-container">
      <div className="chat-area">
      {/* <ChatBubble2 message={setnewMessage} isSent={false} /> */}
        {messages.map((message, index) => (
          <ChatBubble2 key={index} message={message.text} isSent={message.isSent} />
        ))}
      </div>
      <div className="input-area">
                <input
                  type="text"
                  onKeyDown={handleKeyPress}
                  value={sendMessage}
                  onChange={handleInputChange}
                  placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
    </div>
  );
};

export default Chats;
