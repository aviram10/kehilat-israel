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
import { getUser } from "./functions/server";

async function getTimes(setTimes) {
  try {
    const { data } = await axios.get(`${server.url}/times`);
    console.log("times", data);
    setTimes(data);
  } catch (error) {
    // setTimeout(() => {
    //     getTimes(setTimes)
    // }, 500000);
  }
}

function App() {
  const [times, setTimes] = useState({ prayers: [], dayTimes: [], items: [] });
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.user_id) sessionStorage.setItem('user_id', localStorage.user_id);
    if (sessionStorage.user_id)
      getUser(sessionStorage.user_id)
        .then(res => setUser(res.data));
    getTimes(setTimes)
    //update times every day at 00:00
    const tomorrow = DateTime.now().plus({ days: 1 }).startOf('day');
    console.log(tomorrow.diffNow().as('hours'));
    setTimeout(() => {
      getTimes(setTimes)
    }, tomorrow.diffNow().milliseconds);
  }, []);


  //update hebrew date every sunset
  useEffect(() => {

    if (!times.dayTimes) return;
    const sunset = DateTime.fromISO(times.dayTimes.sunset)
    if (sunset.diffNow().milliseconds <= 0) return;
    setTimeout(() => {
      getTimes(setTimes)
    }, sunset.diffNow().milliseconds);
  }, [times])


  return <div className='cont'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar user={user} />}>
          <Route index element={<Home times={times} />} />
          <Route path='home' element={<Home times={times} />} />
          <Route path="login" element={<Login />} />
          <Route path='signup' element={<Login />} />
          <Route path='times' element={<Times times={times} />} />
          <Route path='board' element={<MessagesBoard />} />
          <Route path='dedication' element={<Dedication user={user} />} />
          <Route path='profile' element={<Profile user={user} />} />
          <Route path='managment' element={<Managment user={user} />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
      {/* <TestField /> */}
    </BrowserRouter>

  </div>
}

export default App;
