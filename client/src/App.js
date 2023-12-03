import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import React from 'react';
import Navbar from "./comps/navbar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/home/home";



function App() {

  return <BrowserRouter>
    <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />  
        </Route>
    </Routes>
  </BrowserRouter>

}

export default App;
