import React from 'react';
import Navbar from "./comps/navbar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";




function App() {

  return <BrowserRouter>
    <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />  
        </Route>
    </Routes>
    {/* <TestField /> */}
  </BrowserRouter>

}

export default App;
