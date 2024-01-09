import {useContext} from "react";  
import { NavLink, Outlet } from "react-router-dom";
import {UserContext} from '../App'

import "../styles/navbar.css";

export default function Navbar() {
    const user = useContext(UserContext);
    console.log("navbar", user);
    
    return  <>
    <div className="navbar">
        <div className="logo">
            <NavLink to="/home" >   קהילת ישראל  </NavLink>
        </div>
        <div className="nav">
            <NavLink to="/times" >   זמני היום </NavLink>|    
            <NavLink to="/times" >   זמני התפילות  </NavLink>|    
            <NavLink to="/board">   לוח הקהילה  </NavLink> |    
            <NavLink to="/dedication">  הקדשות  </NavLink>    
            {user?.role === "מנהל" && <NavLink to="/managment">  ניהול  </NavLink> }   
        </div>

        <div className="account">
            <NavLink to={user ? "profile" : "login"}>  {user?.username ||"התחבר" }</NavLink>
        </div>
    </div>
    <Outlet/>
    </>
}