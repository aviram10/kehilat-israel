import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import "../styles/dayTimes.css"
export default function DayTimes({times}) {
    return<div className='dayTimes'>
        <h2>זמני היום</h2>
    <List>
        <ListItem>
            <ListItemText> שקיעת החמה</ListItemText>
            <ListItemText> {times.dayTimes &&times.dayTimes.sunset.split("T")[1].slice(0,5)}</ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText> צאת הכוכבים</ListItemText>
            <ListItemText> {times.dayTimes &&times.dayTimes.dusk.split("T")[1].slice(0,5)}</ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText> נץ החמה</ListItemText>
            <ListItemText>{times.dayTimes &&times.dayTimes.dawn.split("T")[1].slice(0,5)}</ListItemText>
        </ListItem>
    </List>
    
    
    </div>
};
