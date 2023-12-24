
import React, { useState } from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Budge from './budge';
import Like from './like';
import { Divider } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

export default function Message({ params: { message, handleMessage }, children }) {
    const [input, setInput] = useState({ title: message.title, content: message.content })
    const [mode, setMode] = useState('view')

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }


    return <><Card variant='soft' orientation='horizontal' sx={{ bgcolor: "transparent", p: 2, maxWidth: 600 }}>
        <CardOverflow >
            <CardContent sx={{ justifyContent: "start", p: 0, m: 1, ml: 3 }}>
                <Budge message={message} />
            </CardContent>
        </CardOverflow>
        <CardContent >
            {mode === "edit" ? <Input value={input.title} onChange={handleChange} /> : <Typography level='title-lg'>{message.title}</Typography>}
            {mode === "edit" ? <Input value={input.content} onChange={handleChange} /> : <Typography level='body-md'>{message.content}</Typography>}
            <CardActions   >
                <Like params={{ message, children, handleMessage }} />
                {handleMessage.edit && <EditIcon onClick={() => setMode(mode === "edit" ? "veiw" : "edit")} sx={{ border: "1px solid blue" }} color='primary' />}
                {handleMessage.edit && <DeleteIcon onClick={(e) => { handleMessage.delete(message.message_id, e) }} sx={{ color: "red" }} />}
            </CardActions>
        </CardContent>
    </Card><Divider /></>
}