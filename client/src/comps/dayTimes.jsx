import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import "../styles/dayTimes.css"
import { Typography } from '@mui/joy';
export default function DayTimes({ times }) {
    return <div className='dayTimes'>
        <Typography variant='soft' level="h3"> זמני היום</Typography>
        <List>
            <ListItem>
                <ListItemText> נץ החמה</ListItemText>
                <ListItemText>{times.dawn && times.dawn.split("T")[1].slice(0, 5)}</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText> שקיעת החמה</ListItemText>
                <ListItemText> {times.sunset && times.sunset.split("T")[1].slice(0, 5)}</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText> צאת הכוכבים</ListItemText>
                <ListItemText> {times.dusk && times.dusk.split("T")[1].slice(0, 5)}</ListItemText>
            </ListItem>
        </List>
    </div>
};
