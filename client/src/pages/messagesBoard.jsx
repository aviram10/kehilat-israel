import React from 'react';
import Stack from '@mui/joy/Stack';
import "../styles/messagesBoard.css";
import { Input, Textarea, Button, Grid } from '@mui/joy';
import Messages from '../comps/messages';



export default function MessagesBoard(params) {


    return <>
        <Stack m="auto" maxWidth={600}  alignItems="center" spacing={2}>
        <h1>לוח המודעות הקהילתי</h1>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} >
                    <Input placeholder="נושא" required />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Input placeholder="כותרת" required />
                </Grid>
                <Grid xs={12}>
                <Textarea minRows={2} placeholder="תוכן" />

                </Grid>
                <Button type="submit" fullWidth>פרסם</Button>
            </Grid>

            <Messages times={5} />
        </Stack>
    </>
        ;
}
