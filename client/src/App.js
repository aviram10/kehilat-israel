import React from 'react';
import Navbar from "./comps/navbar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import "./App.css";
import Login from './pages/login';




function App() {

  return <BrowserRouter>
    <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />  
          <Route path="login" element={<Login />} />
          <Route path='signup' element={<Login />} />
        </Route>
    </Routes>
    {/* <TestField /> */}
  </BrowserRouter>

}

export default App;
