import React from 'react';
import './MessageInbox.css';

const MessageInbox = ({ channel }) => {
  const renderMessages = () => {
    switch (channel) {
      case 'whatsapp':
        return <div>WhatsApp messages...</div>;
      case 'facebook':
        return <div>Facebook messages...</div>;
      case 'instagram':
        return <div>Instagram messages...</div>;
      case 'webchat':
        return <div>WebChat messages...</div>;
      default:
        return <div>Select a channel to view messages</div>;
    }
  };

  return (
    <div className="message-inbox">
      {renderMessages()}
    </div>
  );
};

export default MessageInbox;
