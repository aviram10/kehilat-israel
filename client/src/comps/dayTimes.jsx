import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import "../styles/dayTimes.css"
export default function DayTimes({}) {
    return<div className='dayTimes'>
        <h2>זמני היום</h2>
    <List>
        <ListItem>
            <ListItemText> שקיעת החמה</ListItemText>
            <ListItemText> 4: 30</ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText> צאת הכוכבים</ListItemText>
            <ListItemText> 5:00</ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText> נץ החמה</ListItemText>
            <ListItemText>6:00</ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText>ש</ListItemText>
            <ListItemText> שקיעת החמה</ListItemText>
        </ListItem>
    </List>
    
    
    </div>
};
