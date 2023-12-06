// import axios from 'axios';
import React, {  useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import '../styles/login.css'

export default function Login({     handleChange, handleCheck, handleClick, input, message }) {


const [mode, setMode] = useState("login");
function changeMode(){
    setMode(prev => prev === "login" ? "signup" : "login")
}
input = {username: "", pass: "", remember: false, first_name: "", last_name: "", email: "", phone: ""}


    return <>
        <div className='container'>
            <div className='img'>
            </div>
            <div className="login">
                <div className="title">
                    <h1>בית כנסת קהילת ישראל</h1>
                </div>

                {mode === "login" ? <div className='form'>
                    <h2>Login</h2>
                    <input type="text" onChange={handleChange} placeholder='username' name='username' value={input.username} />
                    <input type="text" onChange={handleChange} placeholder='password' name='pass' value={input.pass} />
                    <label><input type="checkbox" name="remember" checked={input.remember} onChange={handleCheck} /> remeber me</label>
                    <button onClick={handleClick} >Login</button>
                </div> :

                <div className='form' id='signup'>
                    <h2>sign up</h2>
                    <input type="text" onChange={handleChange} placeholder='first name' name='first_name' value={input.first_name} />
                    <input type="text" onChange={handleChange} placeholder='last name' name='last_name' value={input.last_name} />
                    <input type="text" onChange={handleChange} placeholder='username' name='username' value={input.username} />
                    <input type="text" onChange={handleChange} placeholder='password' name='pass' value={input.pass} />
                    <input type="text" onChange={handleChange} placeholder='email' name='email' value={input.email} />
                    <input type="text" onChange={handleChange} placeholder='phone' name='phone' value={input.phone} />
                    <label><input type="checkbox" name="remember" checked={input.remember} onChange={handleCheck} /> remeber me</label>
                    <button onClick={handleClick} >signup</button>
                </div>}
                <h4>{mode === "login" ? "don't have an account? " : "already have an account? "}<span onClick={changeMode}>click here</span></h4>
                <h4>{message}</h4>
            </div>
        </div>
    </>
}