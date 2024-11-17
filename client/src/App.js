import Navbar from "./comps/navbar";
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import "./App.css";
import Login from './pages/login';
import Times from './pages/times2';
import MessagesBoard from './pages/messagesBoard';
import Dedication from './pages/dedication';
import Profile from './pages/profile';
import Management from './pages/management';
import axios from 'axios';
import server from "./config/server";
import React, { useEffect, useState, createContext } from 'react';
import { DateTime } from 'luxon';
import { getUser } from "./server/users";
import Cookies from "js-cookie";

export const UserContext = createContext(null);

async function getTimes(setTimes) {
  try {
    const { data } = await axios.get(`${server.url}/times`);
    data.prayers = data.prayers.sort((a, b) => a.sort - b.sort);
    setTimes(data);
  } catch (error) {
    setTimeout(() => {
      getTimes(setTimes)
    }, 500000);
  }
}

function App() {
  const [times, setTimes] = useState({ prayers: [], dayTimes: [], items: [] });
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '', phone: '', address: '', city: '', country: '', zip: '', user_id: '' });

  useEffect(() => {
    getTimes(setTimes)
    //update times every day at 00:00
    const tomorrow = DateTime.now().plus({ days: 1 }).startOf('day');
    setTimeout(() => {
      getTimes(setTimes)
    }, tomorrow.diffNow().milliseconds);
    const { token, user_id } = Cookies.get();
    if (!token) return;
    getUser(user_id).then(user => setUser(user))
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

  const updateUser = (user) => setUser(user);


  return <div className='cont'>
    <UserContext.Provider value={[user, setUser]}>

      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home times={times} />} />
          <Route path='home' element={<Home times={times} />} />
          <Route path="login" element={<Login updateUser={updateUser} />} />
          <Route path='signup' element={<Login />} />
          <Route path='times' element={<Times times={times} />} />
          <Route path='board' element={<MessagesBoard />} />
          <Route path='dedication' element={<Dedication />} />
          <Route path='profile' element={<Profile />} />
          <Route path='management' element={<Management times={times} setTimes={setTimes} />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </UserContext.Provider>
    {/* <GameField /> */}
  </div>
}

export default App;
