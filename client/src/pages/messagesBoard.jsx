import React from 'react';
import Stack from '@mui/joy/Stack';
import "../styles/messagesBoard.css";
import Messages from '../comps/messagesComps/messages';
import axios from 'axios';
import { url } from '../config/server';
import { useEffect } from 'react';
import { getMessages } from '../functions/server';
import MessageForm from '../comps/messagesComps/messageForm';

export default function MessagesBoard(params) {
    const [messages, setMessages] = React.useState([]);
    const handleSubmit = async (input) => {
        try {
            //todo: get only the new message
            const { data } = await axios.post(`${url}/messages`, input, { withCredentials: true });
            setMessages([...data].reverse());
        } catch (error) {
            console.log(error);
        }
    }

    const handleSuccess = message => {
        message.likes += message.liked ? -1 : 1;
        message.liked = !message.liked;
        setMessages([...messages]);
    }
    useEffect(() => {
        getMessages().then((data) => {
            setMessages(data);
        })
    }, [])

    return <>
        <Stack m="auto" maxWidth={600} alignItems="center" spacing={2}>
            <h1>לוח המודעות הקהילתי</h1>
            <MessageForm handleSubmit={handleSubmit} />
            <Messages messages={messages} handleMessage={{ handleSuccess }} />
        </Stack>
    </>
        ;
}
