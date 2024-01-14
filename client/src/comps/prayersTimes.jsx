
import React from "react";
import "../styles/prayersTimes.css";
import { List } from "@mui/material";
import Time from "./time";
import { DateTime } from "luxon";
import { Typography } from "@mui/joy";

export default function PrayersTimes({ times, isDaily }) {
    let prayers = times ? times : [];
    if ( isDaily) {
        const category = (DateTime.now().day + 1) % 7 < 6 ? "weekday" : "shabat";//because monday is 1 and sunday is 7
        console.log(category);
        prayers = prayers.filter(t => t.category === category);
        console.log(prayers);
        prayers = prayers.sort((a, b) => a.sort - b.sort);
    }

    return <div className="prayersTimes">
        <Typography textAlign={"center"} variant='soft' level="h3"> זמני התפילות</Typography>
        <List>
            {prayers.map(t => <Time key={t.name} {...t} />)}
        </List>
    </div>
}