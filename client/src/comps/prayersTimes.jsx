
import React, { useEffect, useMemo, useState } from "react";
import "../styles/prayersTimes.css";
import { List } from "@mui/material";
import Time from "./time";
import { DateTime } from "luxon";
import { converToLocalTime } from "../functions/time";

export default function PrayersTimes({ times, isDaily }) {
    let prayers;
    console.log(times);
    if(times && isDaily){
    const category = DateTime.now().day < 6 ? "hol" : "shabat";
    prayers = times.filter(t => t.category === category);
    
    }

    return <div className="prayersTimes">
        <h2>זמני תפילות היום</h2>
        <List>
            {prayers && prayers.map(t => <Time key={t} {...t} />)}
        </List>

    </div>
}