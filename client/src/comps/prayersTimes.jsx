
import React from "react";
import "../styles/prayersTimes.css";
import { List } from "@mui/material";
import Time from "./time";
import { DateTime } from "luxon";
import { Typography } from "@mui/joy";

export default function PrayersTimes({ times, isDaily }) {
    console.log("prayer ", times);
    let prayers = times ? times : [];
    if ( isDaily) {
        const category = (DateTime.now().day + 1) % 7 < 6 ? "weekday" : "shabat";
        prayers = prayers.filter(t => t.category === category);
    }

    return <div className="prayersTimes">
        <Typography textAlign={"center"} variant='soft' level="h3"> זמני התפילות</Typography>
        <List>
            {prayers.map(t => <Time key={t.name} {...t} />)}
        </List>

    </div>
}