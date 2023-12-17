
import React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';


export default function MessageCard({ likes, children}) {
    return <Card variant='soft' orientation='horizontal' sx={{ bgcolor: "transparent", p: 2, maxWidth: 600 }}>
        <CardOverflow >
            <CardContent sx={{ justifyContent: "start", p: 0, m: 0 }}>
                <Avatar variant="soft" color='primary' size='md' sx={{ alignSelf: "center", p: 0, mt: -1 }}></Avatar>
                <Chip variant='soft' sx={{ mt: -1 }}>
                    חבר קהילה
                </Chip>
            </CardContent>
        </CardOverflow>
        <CardContent>
        {children}
            <CardActions  >
                <Chip sx={{'& span': {display:"flex",alignItems: "center"}}}>
                    {likes}
                    <SentimentVerySatisfiedIcon />
                </Chip>
            </CardActions>
        </CardContent>
    </Card>
}