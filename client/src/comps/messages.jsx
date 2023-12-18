import React, { useEffect } from "react";
import Message from "./message";
import { AccordionGroup } from "@mui/joy";

   

export default function Messages({messages}) {
   
    return <>
        <AccordionGroup variant="outlined">
           {messages && messages.map((message, i) => <Message key={i} message={message}  />)}
        </AccordionGroup>
    
    
    
    </>
};
