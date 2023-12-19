import React, { useEffect } from "react";
import { AccordionGroup } from "@mui/joy";
import ExtendMessage from "./extendMessage";

   

export default function Messages({messages}) {
   
    return <>
        <AccordionGroup variant="outlined">
           {messages && messages.map((message) => <ExtendMessage key={message.message_id} message={message}  />)}
        </AccordionGroup>
    </>
};
