import React from 'react';
import Navbar from "./comps/navbar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import "./App.css";
import Login from './pages/login';
import Times from './pages/times';
import MessagesBoard from './pages/messagesBoard';
import Dedication from './pages/dedication';
import Checkout from './comps/checkout/checout';
import Profile from './pages/profile';




function App() {

  return <div className='cont'>
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />  
          <Route path="login" element={<Login />} />
          <Route path='signup' element={<Login />} />
          <Route path='times' element={<Times />} />
          <Route path='board' element={<MessagesBoard />} />
          <Route path='dedication' element={<Dedication/>} />
          <Route path='checkout' element={<Checkout/>} />
          <Route path='profile' element={<Profile/>} />
          <Route path='*' element={<h1>Not Found</h1>} />

        </Route>
    </Routes>
     {/* <TestField /> */}
  </BrowserRouter> 

  </div>
}

export default App;
