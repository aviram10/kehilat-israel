import React from "react";
import Message from "./message";
import { AccordionGroup } from "@mui/joy";

export default function Messages({times}) {
    let messages = []
    for(let i  = 0; i < times; i++){
        messages.push(<Message />)
    }



    return <>
        <AccordionGroup variant="outlined">
           {messages}
        </AccordionGroup>
    
    
    
    </>
};
