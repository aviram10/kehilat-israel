import React from "react";
import Grid from "@mui/material/Grid"

export default function PrayerTime({name, time}) {
    return <Grid container >
    <Grid item xs={6}>
     <h3>{name}</h3>
    </Grid>
    <Grid item xs={6}>
      <h3>{time}</h3>
    </Grid>
   
  </Grid>
       
};
