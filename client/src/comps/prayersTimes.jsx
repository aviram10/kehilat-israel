
import React, { useState } from "react";
import "../styles/prayersTimes.css";
import { List } from "@mui/material";
import Time from "./time";

export default function PrayersTimes({times}){

    return <div className="prayersTimes">
    <h2>זמני תפילות היום</h2>
    <List>
        {times.map(t => <Time key= {t.name} {...t} />)}
    </List>
        <ul>
            <li>זמן קריאת שמע</li>
            <li>שקיעת החמה </li>
            <li>צאת הכוכבים</li>
            
        </ul>
    </div>
}