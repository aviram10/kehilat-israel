
import React, { useState } from "react";
import "../styles/prayersTimes.css";
import { List } from "@mui/material";
import Time from "./time";

export default function PrayersTimes(){
    const [times, setTimes] = useState([{name: "שחרית",time:"7:30" },{name: "מנחה", time:"4:00"}, {name:"ערבית",time:"5:00"}])

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