import React from "react";
import Stack from '@mui/joy/Stack'; 
import Message from "./message";

export default function Messages({times}) {
    let messages = []
    for(let i  = 0; i < times; i++){
        messages.push(<Message />)
    }



    return <>
        <Stack>
           {messages}
        </Stack>
    
    
    
    </>
};
