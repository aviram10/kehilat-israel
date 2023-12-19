import React from "react";
import { AccordionGroup } from "@mui/joy";
import ExtendMessage from "./extendMessage";

   

export default function Messages({messages, handleSuccess, edit}) {
   
    return <>
        <AccordionGroup variant="outlined">
           {messages && messages.map((message) => <ExtendMessage key={message.message_id} params = {{handleSuccess, edit, message}} />)}
        </AccordionGroup>
    </>
};
