import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from '../App'
import { Dropdown, Menu, MenuButton, MenuItem, Button, Link } from "@mui/joy";
import Cookies from "js-cookie";

import "../styles/navbar.css";

export default function Navbar() {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const logout =() =>{
        Cookies.remove("user_id");
        Cookies.remove("username");
        Cookies.remove("pass");
        sessionStorage.removeItem("user_id");
        localStorage.removeItem("user_id");
        setUser({first_name: '', last_name: '', email: '', phone: '', address: '', city: '', country: '', zip: '', id: ''})
        navigate("/");
    }

    const profile = () => {
        navigate("/profile");
    }

    return <>
        <div className="navbar">
            <div className="logo">
                <NavLink to="/home" >   קהילת ישראל  </NavLink>
            </div>
            <div className="nav">
                <NavLink to="/times" >   זמני היום </NavLink>|
                <NavLink to="/times" >   זמני התפילות  </NavLink>|
                <NavLink to="/board">   לוח הקהילה  </NavLink> |
                <NavLink to={user.user_id ? "/dedication" : "/login"}>  הקדשות  </NavLink>
                {user?.role === "מנהל" && <NavLink to="/managment">  ניהול  </NavLink>}
            </div>

            <div className="account">
                {user?.user_id ? <Dropdown>
                    <MenuButton sx={{color:"white"}} size="sm">{`שלום ${user?.username}`} </MenuButton>
                    <Menu>
                        <MenuItem onClick={profile} variant="soft">פרופיל</MenuItem>
                        <MenuItem onClick={logout} variant="soft" color="warning" >התנתק</MenuItem>
                    </Menu>
                </Dropdown> : <NavLink to="/login">  התחברות  </NavLink>}
            </div>
        </div>
        <Outlet />
    </>
}