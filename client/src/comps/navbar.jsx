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
        Cookies.remove("token");
        Cookies.remove("user_id");
        setUser({first_name: '', last_name: '', email: '', phone: '', address: '', city: '', country: '', zip: '', user_id: ''})
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
                <NavLink to="/times" >   זמנים </NavLink>|
                <NavLink to="/board">   לוח הקהילה  </NavLink> |
                <NavLink to={ "/dedication"}>  הקדשות  </NavLink> 
                {user?.role === "מנהל" && '|'}
                {user?.role === "מנהל" && <NavLink to="/management"> ניהול  </NavLink>}
            </div>

            <div className="account">
                {user?.user_id ? <Dropdown>
                    <MenuButton className="profileMenu" sx={{color:"white"}} size="sm">{`שלום ${user?.username}`} </MenuButton>
                    <Menu>
                        <MenuItem className="profileItem" onClick={profile} >פרופיל</MenuItem>
                        <MenuItem  className="profileItem" onClick={logout}  >התנתק</MenuItem>
                    </Menu>
                </Dropdown> : <NavLink to="/login">  התחברות  </NavLink>}
            </div>
        </div>
        <Outlet />
    </>
}