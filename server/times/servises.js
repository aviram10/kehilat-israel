const { DateTime } = require("luxon")
const db = require("../database/db");
const axios = require('axios');
let timesData = {};
let hebrewDate ={hebrew: ""};

async function getDayTimes() {
    try {
        const dateTime = DateTime.now();
        const date = dateTime.toISODate();
        const { data: { times } } = await axios.get(`https://www.hebcal.com/zmanim?cfg=json&geonameid=3448439&date=${date}`)
        return times;
    } catch (err) { console.log(err); }

}
async function getTimesEveryMidnight() {
    try {
        const dateTime = DateTime.now();
        const times = await getDayTimes();
        
        Object.keys(times).forEach(key => {
            timesData[key] = times[key];
        })// add the times to the timesData without overwriting the timesData object itself (so that the reference to timesData in the router doesn't change)
        const tommorow = dateTime.plus({ days: 1 }).toISODate();
        const midnight = DateTime.fromISO(tommorow);
        setTimeout(getTimesEveryMidnight, midnight - dateTime);// get the times every midnight 
    } catch (err) { console.log(err) }
}
async function getHebrewDate() {
    try {
        const dateTime = DateTime.now();
        const date = dateTime.toISODate();
        console.log(date);
        const { data } = await axios.get(`https://www.hebcal.com/converter?cfg=json&date=${date}&g2h=1${await isAfterSunset() && '&gs=on'}`)
        console.log(data.hebrew);
      return data.hebrew;
    } catch (err) { console.log(err); }
}

async function getHebrewDateEverySunset() {
    try{
        hebrewDate.hebrew = await getHebrewDate();
    }catch(err){console.log(err);}
}

async function isAfterSunset(){
    const sunset = timesData.sunset || (await getDayTimes()).sunset; // if timesData.sunset is undefined, getTimes() will be called
    const dateTime = DateTime.now();
    const isAfterSunset = dateTime > DateTime.fromISO(sunset);// if it's after sunset, we need to add gs=on to the url
    return isAfterSunset;
}

async function getPrayersTimes() {
    return await db.get("prayers_times", ["*"], "*");
}

getTimesEveryMidnight();
getHebrewDateEverySunset();
module.exports = { timesData, getDayTimes, getHebrewDate, hebrewDate, getPrayersTimes }

