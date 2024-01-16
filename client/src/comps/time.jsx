import { ListItem, ListItemText } from "@mui/material";
import React from "react";
// import Grid from "@mui/material/Grid"

export default function Time({ prayer_name, time}) {
    return <>
    <ListItem >
      <ListItemText sx={{textAlign: "right"}}> {prayer_name}</ListItemText>
      <ListItemText >{time}</ListItemText>
    </ListItem>
    </>
       
};
