import '../styles/login.css'
import { url } from '../config/server'
import cookie from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useHistory } from 'react-router-dom';
import "../styles/login.css";
import Cookies from 'js-cookie';

export default function Login({updateUser}) {
    const [mode, setMode] = useState("login");
    const [input, setInput] = useState({ username: "", pass: "", remember: false, first_name: "", last_name: "", email: "", phone: "" })
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    useEffect(()=> Cookies.get("token") && navigate("/home"),[navigate])

    function handleChange(e) {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    function changeMode() {
        setMode(prev => prev === "login" ? "register" : "login")
    }
    async function handleClick() {
        try {
            let { data } = await axios.post(`${url}/users/${mode}`, input);
            //todo: check expire date of cookie 
            cookie.set("token", data.token, input.remember ? { expires: 30 } : {});
            cookie.set("user_id", data.user.user_id, input.remember ? { expires: 30 } : {});
            updateUser(data.user);
            setMessage(["success", `${mode} successfully`])
            setTimeout(() => {
                const goto  = document.referrer.includes("login") ? "/home" : -1;
                navigate(goto);
            }, 1000);

        } catch (error) {
            console.log(error);
            setMessage(["fail","password or username are incorrect"])
        }
    }

    function handleCheck(e) {
        setInput({ ...input, remember: e.target.checked })
    }
    return <>
              
        <div className='container'>
            <div className='img'></div>

            <div className='form'>
              <h1>בית כנסת קהילת ישראל</h1>
           { mode === "login" ?
            <div className='login'>
                <h2>Login</h2>
                <input type="text" onChange={handleChange} placeholder='username' name='username' value={input.username} />
                <input type="password" onChange={handleChange} placeholder='password' name='pass' value={input.pass} />
                <label><input type="checkbox" name="remember" checked={input.remember} onChange={handleCheck} /> remeber me</label>
                <button onClick={handleClick} >Login</button>
            </div> :

            <div  id='signup'>
                <h2>sign up</h2>
                <input type="text" onChange={handleChange} placeholder='first name' name='first_name' value={input.first_name} />
                <input type="text" onChange={handleChange} placeholder='last name' name='last_name' value={input.last_name} />
                <input type="text" onChange={handleChange} placeholder='username' name='username' value={input.username} />
                <input type="password" onChange={handleChange} placeholder='password' name='pass' value={input.pass} />
                <input type="text" onChange={handleChange} placeholder='email' name='email' value={input.email} />
                <input type="text" onChange={handleChange} placeholder='phone' name='phone' value={input.phone} />
                <label><input type="checkbox" name="remember" checked={input.remember} onChange={handleCheck} /> remeber me</label>
                <button onClick={handleClick} >signup</button>
            </div>
}
            <h4>{mode === "login" ? "don't have an account? " : "already have an account? "}<span onClick={changeMode}>click here</span></h4>
            <h4 style={{color: message[0] === "success" ? "green": "red"}}>{message[1]}</h4>
        </div>
        </div>
    </>
}