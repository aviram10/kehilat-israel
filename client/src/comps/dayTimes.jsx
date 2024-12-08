import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import "../styles/dayTimes.css"
import { Typography } from '@mui/joy';
export default function DayTimes({ times, isExtends }) {
    console.log(times);
    
    return <div className='dayTimes'>
        <Typography variant='soft' level="h3"> זמני היום</Typography>
        <List sx={{paddingRight: '30px'}}>
            {isExtends && <ListItem>
                <ListItemText sx={{textAlign: 'right'}} > עלות השחר</ListItemText>
                <ListItemText>{times.alotHaShachar && times.alotHaShachar.split("T")[1].slice(0, 5)}</ListItemText>
            </ListItem>}
            <ListItem>
                <ListItemText sx={{textAlign: 'right'}} > נץ החמה</ListItemText>
                <ListItemText>{times.dawn && times.dawn.split("T")[1].slice(0, 5)}</ListItemText>
            </ListItem>
            {isExtends && <ListItem>
                <ListItemText sx={{textAlign: 'right'}}> סוף זמן קריאת שמע</ListItemText>
                <ListItemText>{times.sofZmanShma && times.sofZmanShma.split("T")[1].slice(0, 5)}</ListItemText>
            </ListItem>}
            <ListItem>
                <ListItemText sx={{textAlign: 'right'}}> שקיעת החמה</ListItemText>
                <ListItemText> {times.sunset && times.sunset.split("T")[1].slice(0, 5)}</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText sx={{textAlign: 'right'}}> צאת הכוכבים</ListItemText>
                <ListItemText> {times.dusk && times.dusk.split("T")[1].slice(0, 5)}</ListItemText>
            </ListItem>
            {isExtends && <ListItem>
                <ListItemText sx={{textAlign: 'right'}}> חצות</ListItemText>
                <ListItemText>{times.chatzotNight && times.chatzotNight.split("T")[1].slice(0, 5)}</ListItemText>
            </ListItem>}
        </List>
    </div>
};
