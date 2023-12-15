import { ListItem, ListItemText } from "@mui/material";
import React from "react";
// import Grid from "@mui/material/Grid"

export default function Time({ name, time}) {
    return <>
    <ListItem sx={{textAlign: "center"}}>
      <ListItemText > {name}</ListItemText>
      <ListItemText>{time}</ListItemText>
    </ListItem>
    </>
       
};
