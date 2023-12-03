import React from "react";  
import { NavLink, Outlet } from "react-router-dom";
import "./navbar.css";

export default function HorizontalList() {
    return  <>
    <div className="navbar">
        <div className="account">
            <NavLink>  אזור אישי </NavLink>
        </div>
        <div className="nav">
            <NavLink to="/home" >   זמני היום </NavLink>|    
            <NavLink to="/home" >   זמני התפילות  </NavLink>|    
            <NavLink to="/home">   לוח הקהילה  </NavLink>    
        </div>

        <div className="logo">
            <NavLink to="/home" >   קהילת ישראל  </NavLink>
        </div>
    </div>
    <Outlet/>
    </>
}