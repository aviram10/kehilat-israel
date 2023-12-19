
import React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Budge from './budge';
import Like from './like';
import { Divider } from '@mui/joy';


export default function Message({params: { message, edit, handleSuccess}, children}) {
    return<><Card variant='soft' orientation='horizontal' sx={{ bgcolor: "transparent", p: 2, maxWidth: 600 }}>
        <CardOverflow >
            <CardContent sx={{ justifyContent: "start", p: 0, m: 1, ml:3 }}>
              <Budge message={message} />
            </CardContent>
        </CardOverflow>
        <CardContent >
        {children}
            <CardActions  >
               <Like params = {{message, children, handleSuccess}} />
               {edit && <button onClick={() => edit(message)}>ערוך</button>}
            </CardActions>
        </CardContent>
    </Card><Divider/></> 
}