import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import "../styles/dayTimes.css"
import { Typography } from '@mui/joy';
export default function DayTimes({times}) {
    return<div className='dayTimes'>
       <Typography variant='soft' level="h3"> זמני היום</Typography>
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
