import './App.css';
import React from 'react';
import CallIcon from '@mui/icons-material/Call';
import MessageIcon from '@mui/icons-material/Message';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EmailSharpIcon from '@mui/icons-material/EmailSharp'
import HomeIcon from '@mui/icons-material/Home';
import {BrowserRouter, Route, Routes, NavLink} from "react-router-dom"
import Home from "./pages/Home"
import Call from "./pages/Call"
import Multimessages from "./pages/Multimessages"
import Ticket from "./pages/Ticket"
import Analysis from "./pages/Analysis"


function App() {
  


  
  // useEffect(() => {
  //   // Fetch Gmail messages when the component mounts
  //    axios.get('https://localhost:3003/api/mail/list/marvin@telvoip.io/messages/190586b9b40e42c7')
  //     .then((response) => {
  //       console.log(response)
  //       setMessages(response);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching Gmail messages:', error);
  //     });
  // }, []);
  
  return (
    <BrowserRouter>
    <div className="App">
      <div className="container">
     
      <nav className="nav">
      
      <NavLink to="/"><HomeIcon/></NavLink>
      <NavLink to="Call"><CallIcon/></NavLink>
      <NavLink to="Multimessages"><MessageIcon/></NavLink>
      <NavLink to="Ticket"><EmailSharpIcon/></NavLink>
      <NavLink to="Analysis"><AssessmentIcon/></NavLink>
      
      </nav>

      <div className="main-content">

        <Routes>
          <Route index element={<Home/>}/>
          <Route path='Call' element={<Call/>}/>
          <Route path='Multimessages' element={<Multimessages/>}/>
          <Route path='Ticket' element={<Ticket/>}/>
          <Route path='Analysis' element={<Analysis/>}/>
        </Routes>
        
      </div>
    </div>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
