import React, { useState, useEffect } from "react";
import "../styles/home.css";
import shul from "../assets/shul.jpg";

import axios from 'axios';
import { DateTime } from "luxon";
import {  Grid } from "@mui/material";
import PrayersTimes from "../comps/prayersTimes";
async function fetchData(setHebrewDate, setTimes) {
    try {
        const date = DateTime.now();
        const currentDate = date.toISODate();
        const { data: { times } } = await axios.get(`https://www.hebcal.com/zmanim?cfg=json&geonameid=295514&date=${currentDate}`)
        const gs = DateTime.now() > DateTime.fromISO(times.sunset) && "on"
        const { data: { hebrew: hebrewDate } } = await axios.get(`https://www.hebcal.com/converter?cfg=json&date=${currentDate}&g2h=1&strict=1&gs=${gs}`);
        setHebrewDate(hebrewDate)
        setTimes(times);
    } catch (error) {
        setTimeout(() => {
            fetchData(setHebrewDate)
        }, 500000);
    }
}


export default function Home() {
    const [hebrewDate, setHebrewDate] = useState("");
    const [times, setTimes] = useState({});

    useEffect(() => {
        fetchData(setHebrewDate, setTimes)
    }, []);

    useEffect(() => {
        const sunset = DateTime.fromISO(times.sunset)
        setTimeout(() => {
            fetchData(setHebrewDate, setTimes)
        }, sunset.diffNow());
    }, [times])

    return <Grid container sx={{m: 2}} rowSpacing={1} spacing={2}>
           
                <Grid item xs={8} >
                    <div className="info" >
                        <h1>קהילת ישראל</h1>
                        <h2>בית כנסת שהוא גם קהילה</h2>
                    </div>
                    <p> ברוכים הבאים לאתר הבית כנסת שלנו. אנחנו קהילה חרדית שמחה ומאוחדת, שמקיימת את התורה והמצוות באהבה וביראה. באתר זה תוכלו למצוא מידע על השירותים, השיעורים, האירועים והפעילויות שאנחנו מציעים לחברי הקהילה ולכל המעוניינים. </p>
                    <img src={shul} alt="" width={"100%"} height={"400"} />

                
                </Grid>
                <Grid item style={{border: "1px solid black"}} xs={4}>
                 <h3> פרשת השבוע וישלח {hebrewDate} </h3>
                    <PrayersTimes />
                    
                </Grid>
              
                <Grid item xs={10} border={"1px solid black"} sx={{m:2}}>
                    <h2>פרנס היום: בעילום שם לעילוי נשמת כל הנרצחים  </h2>
                </Grid>
          
        </Grid>

   
}   