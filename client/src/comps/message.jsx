import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react';
import '../styles/message.css';

export default function Message({}) {
    return <>
    <Card className='card'
    sx = {{maxWidth: 700}} 
    >
        <CardHeader className='cardHeader'
        avatar = { <Avatar> ר</Avatar>}
        title = "הרב יוסף רוזנבלום"
        subheader = "פרשת השבוע וישלח"
    
        />
        <CardContent className='cardContent' sx={{maxHeight: "10px"}}>
            <Typography sx = {{m:0}}  variant="body" color="text.primary">
                זהו כותרת
            </Typography>
            <Typography variant="body2" color="text.secondary">
                זהו גוף ההודעה והוא יכול להיות ארוך מאוד ועם הרבה טקסט עם מספר שורות כדי שנוכל לראות איך זה נראה כשהוא ארוך ועם הרבה טקסט עם מספר שורות
            </Typography>
        </CardContent>
    </Card>
    </>
}