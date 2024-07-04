import React, { useState } from 'react';
// import io from "socket.io-client";
import './chatbox.css';
import ChatBubble from '../chatbubble/Chatbubble';


// const socket= io.connect("http://localhost:3001");


const ChatBox = () => {
  const [message, setMessage] = useState('');
  // const [messageReceived,setmessageReceived]= useState('')
  const [messages, setMessages] = useState([
    { text: 'Hello! How are you?', isSent: false },
    { text: 'I am good, thank you!', isSent: true },
  ]);

  

  const handleSendMessage = () => {
    // Handle sending message
    // socket.emit("Message sent: ", message);
    // console.log(socket)
  
    if (message.trim()) {
      setMessages([...messages, { text: message, isSent: true }]);
      setMessage('');
    }
    
    // useEffect(()=>{
    //   socket.on("recieve message",(data)=>{
    //     setmessageReceived(data.message)
    //   })
    // },[socket])
    
  };

  return (
    <div className="chat-box">
      <div className="messages">
      {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.text} isSent={msg.isSent} />
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
