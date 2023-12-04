
import React, { useState } from "react";
import PrayerTime from "./prayerTime";
import "../styles/todayTimes.css";

export default function TodayTimes(){
    const [times, setTimes] = useState([{name: "שחרית",time:"7:30" },{name: "מנחה", time:"4:00"}, {name:"ערבית",time:"5:00"}])

    return <>
    <h3>זמני תפילות היום</h3>
    
    <table>
    <tbody>
        {times.map(t => <PrayerTime key= {t.name} {...t} />)}
    </tbody>
    </table>
    </>
}