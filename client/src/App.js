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
import Managment from './pages/managment';
import axios from 'axios';
import server from "./config/server";
import React, { useEffect, useState } from 'react'; 
import { DateTime } from 'luxon';

async function getTimes(setTimes) {
    try {
        const { data: { times } } = await axios.get(`${server.URL}/times`);
        setTimes(times);
    } catch (error) {
        setTimeout(() => {
            getTimes(setTimes)
        }, 500000);
    }
}

function App() {
  const [times, setTimes] = useState({});
  useEffect(() => {
    getTimes(setTimes)
  }, []);

  useEffect(() => {
    const sunset = DateTime.fromISO(times.sunset)
    setTimeout(() => {
      getTimes(setTimes)
    }, sunset.diffNow());
  }, [times])

  return <div className='cont'>
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home times={times} />} />  
          <Route path='home' element={<Home times={times} />} />  
          <Route path="login" element={<Login />} />
          <Route path='signup' element={<Login />} />
          <Route path='times' element={<Times times={times} />} />
          <Route path='board' element={<MessagesBoard />} />
          <Route path='dedication' element={<Dedication/>} />
          <Route path='checkout' element={<Checkout/>} />
          <Route path='profile' element={<Profile/>} />
          <Route path='managment' element={<Managment/>} />
          <Route path='*' element={<h1>Not Found</h1>} />

        </Route>
    </Routes>
     {/* <TestField /> */}
  </BrowserRouter> 

  </div>
}

export default App;
