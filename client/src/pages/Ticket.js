import React, { useState } from 'react';
import "../App.css"
import Chats from "../components/chats/Chats"
import NavItem from "../components/navitem/NavItem";
import MessageInbox from '../components/messageinbox/MessageInbox';



const Ticket=()=>{
  const [activeChannel, setActiveChannel] = useState('whatsapp');

  const handleNavClick = (channel) => {
    setActiveChannel(channel);
  };  
  
      return(
        <div className='main-content'>
        <div className="section left-section">
        <div className="app-container">
        <div className="nav-container">
        <NavItem 
          channel="whatsapp" 
          isActive={activeChannel === 'whatsapp'} 
          onClick={() => handleNavClick('whatsapp')} 
          icon="whatsapp-svg.svg" 
        />
        <NavItem 
          channel="facebook" 
          isActive={activeChannel === 'facebook'} 
          onClick={() => handleNavClick('facebook')} 
          icon="facebook-svg.svg" 
        />
        <NavItem 
          channel="instagram" 
          isActive={activeChannel === 'instagram'} 
          onClick={() => handleNavClick('instagram')} 
          icon="instagram-svg.svg" 
        />
        <NavItem 
          channel="webchat" 
          isActive={activeChannel === 'webchat'} 
          onClick={() => handleNavClick('webchat')} 
          icon="webchat-svg.svg" 
        />
        </div>
        <div className="inbox-container">
          <MessageInbox channel={activeChannel} />
        </div>
    </div>
        
         
        </div>
        <div className="section right-section">
        <Chats/>
        
        </div>
        </div>
    )


}

export default Ticket;