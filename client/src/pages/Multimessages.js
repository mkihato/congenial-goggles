import ChatBox from '../components/chatbox/Chatbox';
import MessageBox from "../components/message/MessageBox";
import { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css"


const Multimessages=()=>{
    const [messages, setMessages] = useState([]);

    const [messageDetails, setMessageDetails] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState('');

    const handleDataFromChild = (data) => {
      setSelectedMessage(data);
    };
  

  useEffect(() => {
    axios.get('https://api.telvoip.io/api/mail/list/marvin@telvoip.io/messages/')
      .then((response) => {
        setMessages(response.data.messages);
        
        const mailIds = response.data.messages;

        const detailPromises = mailIds.map((element) => {
          return axios.get(`https://api.telvoip.io/api/mail/list/marvin@telvoip.io/messages/${element.id}`)
            .then((res) => {
              
              const headers = res.data.payload.headers;
              const fromHeader = headers.find(header => header.name === 'From');
              return {
                snippet: res.data.snippet,
                from: fromHeader ? fromHeader.value : 'Unknown'
              };
            });
        });

        Promise.all(detailPromises).then((details) => {
          setMessageDetails(details);
        }).catch((error) => {
          console.error('Error fetching message details:', error);
        });

      })
      .catch((error) => {
        console.error('Error fetching Gmail messages:', error);
      });
  }, []);
      
    
    return(
        <div className='main-content'>
        <div className="section left-section">
          <MessageBox messages={messageDetails} onDataFromChild={handleDataFromChild}/>
          {/* {messageDetails.map((message, index) => (
          <li key={index}>
            <p>From: {message.from}</p>
            <p>Snippet: {message.snippet}</p>
          </li>
        ))} */}
        </div>
        <div className="section right-section">
          <ChatBox setnewMessage={selectedMessage}/>
        </div>
        </div>
    )
    


}

export default Multimessages;