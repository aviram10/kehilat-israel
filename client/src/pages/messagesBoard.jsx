import React, { useMemo, useEffect } from 'react';
import Stack from '@mui/joy/Stack';
import "../styles/messagesBoard.css";
import Messages from '../comps/messagesComps/messages';
import axios from 'axios';
import { url } from '../config/server';
import { getMessages } from '../functions/server';
import MessageForm from '../comps/messagesComps/messageForm';
import {toggleLike} from '../functions/server';


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

    const handleMessages = useMemo(() =>
    ({
        toggleLike: async message_id => {
            try{
                await toggleLike(message_id);
                setMessages(prev => {
                    const message = prev.find(m => m.message_id === message_id);
                    message.liked = !message.liked;
                    message.liked ? message.likes++ : message.likes--; 
                    return [...prev]
                })
            }catch(e){
                console.log(e)
            }
        }
    }),[])

    useEffect(() => {
        getMessages().then((data) => {
            setMessages(data);
        })
    }, [])

    return <>
        <Stack m="auto" maxWidth={600} alignItems="center" spacing={2}>
            <h1>לוח המודעות הקהילתי</h1>
            <MessageForm handleSubmit={handleSubmit} />
            <Messages messages={messages} handleMessage={handleMessages} />
        </Stack>
    </>
        ;
}
