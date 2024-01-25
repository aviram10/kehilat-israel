import { Select, Option } from "@mui/joy";
import { useState } from "react";


export default function GameField(params) {

    return <div>
    <Select  onChange={({target}, value)=>{
        target.name = "fd";
            console.log(target.name, value)
        }} placeholder={"this is a try"}>
        <Option value="1">1</Option>
        <Option value="2">2</Option>
        <Option value="3">3</Option>
        <Option value="4">4</Option>
    </Select>
    </div>
};
