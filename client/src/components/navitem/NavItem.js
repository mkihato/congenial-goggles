import React from 'react';
import './NavItem.css';

const NavItem = ({ channel, isActive, onClick, icon }) => {
  return (
    <div 
      className={`nav-item ${isActive ? 'active' : ''}`} 
      onClick={onClick}
    >
      <img src={icon} alt={`${channel} icon`} />
      <span>{channel.charAt(0).toUpperCase() + channel.slice(1)}</span>
    </div>
  );
};

export default NavItem;