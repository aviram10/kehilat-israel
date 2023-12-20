
import React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Budge from './budge';
import Like from './like';
import {  Divider } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {MessagesContext} from '../../pages/profile';

export default function Message({params: { message, edit, handleSuccess}, children}) {
    const messages = React.useContext(MessagesContext);
    console.log(messages);
    return<><Card variant='soft' orientation='horizontal' sx={{ bgcolor: "transparent", p: 2, maxWidth: 600 }}>
        <CardOverflow >
            <CardContent sx={{ justifyContent: "start", p: 0, m: 1, ml:3 }}>
              <Budge message={message} />
            </CardContent>
        </CardOverflow>
        <CardContent >
        {children}
            <CardActions   >
               <Like params = {{message, children, handleSuccess}} />
           
               {edit && <EditIcon  color='primary'  />}
               {edit && <DeleteIcon  sx={{color:"red"}}  />}
              
            </CardActions>
        </CardContent>
    </Card><Divider/></> 
}