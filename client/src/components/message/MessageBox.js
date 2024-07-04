import React, { useState } from 'react';
import './messagebox.css';
import ReactPaginate from 'react-paginate';





const MessageBox = ({ messages }) => {
  // const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const messagesPerPage = 10;
  
  console.log(messages)
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const offset = currentPage * messagesPerPage;
  const currentMessages = messages.slice(offset, offset + messagesPerPage);
  const pageCount = Math.ceil(messages.length / messagesPerPage);

  return (
    <div className="message-box">
      <h2 className='message-boxtitle'>Welcome to your inbox</h2>
      
      {currentMessages.map((message, index) => (
        <div key={index} className="message">
          <div className="avatar">📧</div>
          <div className="message-content">
            <h2>{message.id}</h2>
            <p>{message.snippet}</p>
          </div>
        </div>
      ))}
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        
        activeClassName={'paginationActive'}
      />
    </div>
  );
  
};

export default MessageBox;
