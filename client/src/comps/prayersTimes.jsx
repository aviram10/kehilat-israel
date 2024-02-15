
import React from "react";
import "../styles/prayersTimes.css";
import { List, ListItem, ListItemText } from "@mui/material";
import { DateTime } from "luxon";
import { Typography } from "@mui/joy";

export default function PrayersTimes({ times, isDaily }) {
    let prayers = times ? times : [];
    if ( isDaily) {
        const category = (DateTime.now().day + 1) % 7 < 6 ? "weekdays" : "shabat";//because monday is 1 and sunday is 7

        prayers = prayers.filter(t => t.category === category);
        prayers = prayers.sort((a, b) => a.sort - b.sort);
    }

    return <div className='dayTimes'>
        <Typography textAlign={"center"} variant='soft' level="h3"> זמני התפילות</Typography>
        <List>
            {prayers.map(t =>  <ListItem key={Math.random()}>
                <ListItemText>{t.prayer_name}</ListItemText>
                <ListItemText>{ t.time}</ListItemText>
            </ListItem> )}
        </List>
    </div>
}