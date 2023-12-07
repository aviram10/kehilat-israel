import React from 'react';
import Stack from '@mui/joy/Stack';
import Message from '../comps/message';
import "../styles/messagesBoard.css";
import { AccordionGroup, Input, Textarea, Button, Sheet } from '@mui/joy';



export default function MessagesBoard(params) {


    return <>
        <h1>לוח המודעות הקהילתי</h1>
        <Stack m="auto" maxWidth={800} alignItems="center">
            <Sheet variant='soft' sx={{p:2, m: 2}}>
                <Stack  spacing={1}>
                    <Input placeholder="נושא" required />
                    <Textarea minRows={2} placeholder="תוכן" />
                    <Button type="submit">פרסם</Button>
                </Stack>
            </Sheet>
            <AccordionGroup >
                <Message />
                <Message />
                <Message />
                <Message />
            </AccordionGroup>
        </Stack>
    </>
        ;
}
