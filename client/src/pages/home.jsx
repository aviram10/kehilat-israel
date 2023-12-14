import React, { useState, useEffect } from "react";
import "../styles/home.css";

import axios from 'axios';
import { DateTime } from "luxon";
import { Grid } from "@mui/material";
import PrayersTimes from "../comps/prayersTimes";
import MyGallery from "../comps/galleryImages";



export default function Home() {

    return <Grid onClick={() => { console.log("test"); }} container sx={{ m: 2 }} rowSpacing={2} spacing={2}>
        <Grid item lg={8} md={6} xs={10}>
            <div className="info" >
                <h1>קהילת ישראל</h1>
                <h2>בית כנסת שהוא גם קהילה</h2>
            </div>
            <p> ברוכים הבאים לאתר הבית כנסת שלנו. אנחנו קהילה חרדית שמחה ומאוחדת, שמקיימת את התורה והמצוות באהבה וביראה. באתר זה תוכלו למצוא מידע על השירותים, השיעורים, האירועים והפעילויות שאנחנו מציעים לחברי הקהילה ולכל המעוניינים. </p>
            <MyGallery />
        </Grid>
        <Grid item lg={3} md={5} xs={10} style={{ border: "1px solid black" }} >
            <PrayersTimes />
        </Grid>
        <Grid item xs={11} border={"1px solid black"} sx={{ m: 2 }}>
            <h2>פרנס היום: בעילום שם לעילוי נשמת כל הנרצחים  </h2>
        </Grid>
    </Grid>
}   