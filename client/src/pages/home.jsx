import React, { useState, useEffect } from "react";
import "../styles/home.css"
import TodayTimes from "../comps/todayTimes";
import shul from "../assets/shul.jpg"

import axios from 'axios';
import { DateTime } from "luxon";
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

async function getHebrewTime(setHebrewDate){

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

    return <>
        <main>
            <div className="info">
                <h1>קהילת ישראל</h1>
                <h2> אתר קהילתי</h2>

                {/* <p> ברוכים הבאים לאתר הבית כנסת שלנו. אנחנו קהילה חרדית שמחה ומאוחדת, שמקיימת את התורה והמצוות באהבה וביראה. באתר זה תוכלו למצוא מידע על השירותים, השיעורים, האירועים והפעילויות שאנחנו מציעים לחברי הקהילה ולכל המעוניינים. אנחנו מזמינים אתכם להצטרף אלינו בתפילה, בלימוד, בחסד ובשמחה.
                </p> */}
                {/* <img src={shul} alt="" width={"100%"} height={"400"} /> */}
            </div>
            <div className="todayTimes">
                {hebrewDate}
                <TodayTimes />
            </div>
        </main>

    </>
}   