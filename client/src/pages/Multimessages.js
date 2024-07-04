import ChatBox from '../components/chatbox/Chatbox';
import MessageBox from "../components/message/MessageBox";
import { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css"






const Multimessages=()=>{
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        // Fetch Gmail messages when the component mounts

        axios.get('http://localhost:3003/api/mail/list/marvin@telvoip.io/messages/')
          .then((response) => {
            setMessages(response.data.messages);
            // const mailIds= response.data.messages
            // const x =mailIds.forEach((element) => {
            //   return axios.get(`http://localhost:3003/api/mail/list/marvin@telvoip.io/messages/${element.id}`).then((res)=>{
            //     setMessages (res.data)
                
            //   })
            // });
            // console.log(x)
             
          
          })
          .catch((error) => {
            console.error('Error fetching Gmail messages:', error);
          });
      }, []);
    
      
    
    return(
        <div className='main-content'>
        <div className="section left-section">
          <MessageBox messages={messages}/>
        </div>
        <div className="section right-section">
          <ChatBox/>
        </div>
        </div>
    )
    


}

export default Multimessages;