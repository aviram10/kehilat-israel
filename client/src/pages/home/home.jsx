import { useState, useEffect } from 'react';
import axios from 'axios';
import {DateTime} from "luxon";
async function fetchData(setHebrewDate) {
    try {
        const currentDate = DateTime.now().toISODate();
        const {data: {times}} = await axios.get(`https://www.hebcal.com/zmanim?cfg=json&geonameid=295514&date=${currentDate}`)
        const gs = DateTime.now() > DateTime.fromISO(times.sunset) && "on"
        const { data } = await axios.get(`https://www.hebcal.com/converter?cfg=json&date=${currentDate}&g2h=1&strict=1&gs=${gs}`);
        setHebrewDate(data.hebrew)

    } catch (error) {
        setTimeout(() => {
            fetchData(setHebrewDate)
        }, 500000);
    }
}

export default function Home() {
    const [hebrewDate, setHebrewDate] = useState("");

    useEffect(() => {
       fetchData(setHebrewDate)
    }, []);

    return (
        <>
            <main>
                <div className="info"></div>
                <div className="prayTimes">
                    {hebrewDate}
                </div>
            </main>
        </>
    );
}
