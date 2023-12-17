import React from "react";  
import { NavLink, Outlet } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
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
        </div>

        <div className="account">
            <NavLink to={sessionStorage.user_id ? "profile" : "login"}>  אזור אישי </NavLink>
        </div>
    </div>
    <Outlet/>
    </>
}