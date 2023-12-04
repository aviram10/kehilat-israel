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
            <NavLink to="/home" >   זמני היום </NavLink>|    
            <NavLink to="/home" >   זמני התפילות  </NavLink>|    
            <NavLink to="/home">   לוח הקהילה  </NavLink> |    
            <NavLink to="/home">  הקדשות  </NavLink>    
        </div>

        <div className="account">
            <NavLink>  אזור אישי </NavLink>
        </div>
    </div>
    <Outlet/>
    </>
}