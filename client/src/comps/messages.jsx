import React, { useEffect } from "react";
import axios from "axios";
import Message from "./message";
import { AccordionGroup } from "@mui/joy";
import { url } from "../config/server";

async function getMessages() {
    try {
        const {data} = await axios.get(url + "/messages");
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}   

export default function Messages() {
    const [messages, setMessages] = React.useState([]);
    useEffect( ()=>{
        getMessages().then(data => setMessages(data));
    },[])




    return <>
        <AccordionGroup variant="outlined">
           {messages && messages.map((message, i) => <Message key={i} message={message} comments />)}
        </AccordionGroup>
    
    
    
    </>
};
