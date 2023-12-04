import React, { useState } from "react";

export default function TestField(){
    const [counter, setCounter] = useState(1);
    setInterval(() => {
        setCounter(prev => prev+1);
    }, 3000);
    return <h1>counter {counter}</h1>
    
}
