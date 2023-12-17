import React from 'react';
import Stack from '@mui/joy/Stack';
import "../styles/messagesBoard.css";
import { Input, Textarea, Button, Grid } from '@mui/joy';
import Messages from '../comps/messages';
import axios from 'axios';



export default function MessagesBoard(params) {
    const [input, setInput] = React.useState({});
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const handleSubmit = () => {
       axios.post('/api/messages', input)
    }



    return <>
        <Stack m="auto" maxWidth={600}  alignItems="center" spacing={2}>
        <h1>לוח המודעות הקהילתי</h1>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} >
                    <Input name='category' value={input.category} onChange={handleChange} placeholder="נושא" required />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Input name='title' value={input.title} onChange={handleChange} placeholder="כותרת" required />
                </Grid>
                <Grid xs={12}>
                <Textarea name='content' value={input.content} onChange={handleChange}  minRows={2} placeholder="תוכן" />

                </Grid>
                <Button type="submit" onClick={handleSubmit}  fullWidth>פרסם</Button>
            </Grid>

            <Messages times={5} />
        </Stack>
    </>
        ;
}
