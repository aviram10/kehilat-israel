import "../styles/login.css";
import { url } from "../config/server";
import cookie from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/login.css";
import Cookies from "js-cookie";
import { TextField, Box, FormControlLabel, Checkbox } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
});

export default function Login({ updateUser }) {
  const [mode, setMode] = useState("login");
  const [input, setInput] = useState({
    username: "",
    pass: "",
    remember: false,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  
  function changeMode() {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setMessage(null);
  }
  async function handleClick(e) {
    try {
      e.preventDefault();
      let { data } = await axios.post(`${url}/users/${mode}`, input);
      const {token, user} = data      
      
      //todo: check expire date of cookie
      cookie.set("token", token, input.remember ? { expires: 30 } : {});
      cookie.set(
        "user_id",
        user.user_id,
        input.remember ? { expires: 30 } : {}
      );
      updateUser(user);
      setMessage(["success", `${mode} successfully`]);
      const goto = location.state?.goto ? location.state.goto : "/home";
      navigate(goto);
    } catch (error) {
      console.log(error);
      setMessage(["fail", error?.response?.data || "error"]);
    }
  }

  //   function handleCheck(e) {
  //     setInput({ ...input, remember: e.target.checked });
  //   }
  return (
    <>
      <div className="container">
        <div className="img"></div>

        <div className="form" style={{ height: "100%", overflow: "auto" }}>
          <h1>בית כנסת קהילת ישראל</h1>
          {mode === "login" ? (
            <div className="login">
              <h2>התחבר</h2>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  type="text"
                  onChange={handleChange}
                  label="שם משתמש"
                  name="username"
                  value={input.username}
                />
                <TextField
                  type="password"
                  onChange={handleChange}
                  label="סיסמא"
                  name="pass"
                  value={input.pass}
                />
              </Box>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="זכור אותי"
              />
              <button onClick={handleClick}>Login</button>
            </div>
          ) : (
            <div className="login">
              <h2>הרשם</h2>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    m: 1,
                    width: "25ch",
                    height: "5ch",
                  },
                  flexDirection: "column",
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  type="text"
                  onChange={handleChange}
                  label="שם פרטי"
                  name="first_name"
                  value={input.first_name}
                />
                <TextField
                  type="text"
                  onChange={handleChange}
                  label="שם משפחה"
                  name="last_name"
                  value={input.last_name}
                />
                <TextField
                  type="text"
                  onChange={handleChange}
                  label="שם משתמש"
                  name="username"
                  value={input.username}
                />
                <TextField
                  type="password"
                  onChange={handleChange}
                  label="סיסמא"
                  name="pass"
                  value={input.pass}
                />
                <TextField
                  type="text"
                  onChange={handleChange}
                  label="מייל"
                  name="email"
                  value={input.email}
                />
                <TextField
                  type="text"
                  onChange={handleChange}
                  label="פלאפון"
                  name="phone"
                  value={input.phone}
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="זכור אותי"
                />
                <button onClick={handleClick}>הירשם</button>
              </Box>
            </div>
          )}
          <h4>
            {mode === "login" ? "אין לך חשבון? " : "כבר יש לך חשבון? "}
            <span onClick={changeMode}>לחץ כאן </span>
          </h4>
          {message?.length === 2 && (
            <h4 style={{ color: message[0] === "success" ? "green" : "red" }}>
              {message[1]}
            </h4>
          )}
        </div>
      </div>
    </>
  );
}
