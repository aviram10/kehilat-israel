import React from "react";
import { AccordionGroup } from "@mui/joy";
import ExtendMessage from "./extendMessage";
   

export default function Messages({messages, handleMessage}) {
   console.log(handleMessage);
    return <>
        <AccordionGroup variant="outlined">
           {messages && messages.map((message) =>
            <ExtendMessage key={message.message_id} message={message} handleMessage={handleMessage} />)}
        </AccordionGroup>
    </>
};
