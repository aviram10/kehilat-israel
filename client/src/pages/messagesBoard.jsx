import React from 'react';
import Stack from '@mui/joy/Stack';
import Message from '../comps/message';
import "../styles/messagesBoard.css";
import { AccordionGroup, Input, Textarea , Button} from '@mui/joy';



export default function MessagesBoard(params) {


    return <>
        <h1>לוח המודעות הקהילתי</h1>
        <Stack m="auto" maxWidth={800} alignItems="center">
        <Stack width={"50%"} spacing={1}>
    <Input placeholder="נושא" required />
    <Textarea minRows={2} placeholder="תוכן"  />
    <Button type="submit">פרסם</Button>
  </Stack>
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
