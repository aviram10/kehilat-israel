import axios from 'axios';
import React, { useState } from 'react';
import '../styles/login.css'
import {url} from '../config/server' 
import cookie from 'js-cookie';



export default function Login() {
    const [mode, setMode] = useState("login");
    const [input, setInput] = useState({ username: "", pass: "", remember: false, first_name: "", last_name: "", email: "", phone: ""})
    const [message, setMessage] = useState("");
    function changeMode() {
        setMode(prev => prev === "login" ? "signup" : "login")
    }

    function handleChange(e) {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    async function handleClick() {
        try {
            let { date } = await axios.post(`${url}/${mode}`, input);
            sessionStorage.setItem("user_id", date.user_id);
            if (input.remember) {
                localStorage.setItem("user_id", date.user_id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleCheck(e) {
        setInput({ ...input, remember: e.target.checked })
    }


    return <>
        <div className='container'>
            <div className='img'>
            </div>
            <div className="login">
                <h1>בית כנסת קהילת ישראל</h1>
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