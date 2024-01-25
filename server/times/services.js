const { DateTime } = require("luxon")
const axios = require('axios');
const accessData = require('./accessData');
const dayTimes = {};
const hebrewDate = {};
const weekTimes = [];
const prayersTimes = []

async function getTimesEveryMidnight() {
    try {
        console.log('getTimesEveryMidnight');
        let data = await getDayTimes();
        copyToGlobalVar(data, dayTimes);
        const dateTime = DateTime.now();
        const midnight = dateTime.plus({ days: 1 }).startOf('day');
        setTimeout(getTimesEveryMidnight, midnight.diffNow());// get the times every midnight 
    } catch (err) { console.log(err) }
}

async function getWeekTimesEverySunday() {
    try {
        console.log('getWeekTimesEverySunday');
        let now = DateTime.now();
        //calc next sunday
        now = now.plus({ days: 1 });
        if (now.weekday === 7) now = now.plus({ days: 1 });
        const nextSunday = now.plus({ days: 7 }).startOf('week').minus({ days: 1 });

        let data = await getWeekTimes(now.toISODate(), nextSunday.toISODate());
        weekTimes.splice(0, weekTimes.length)
        data.forEach(t => weekTimes.push(t))
        data = await getPrayersTimes()
        prayersTimes.splice(0, prayersTimes.length)
        data.forEach(p => prayersTimes.push(p))
        setTimeout(getWeekTimesEverySunday, nextSunday - now);// get the times every midnight
    } catch (err) { console.log(err); }
}

async function getHebrewDateEverySunset() {
    try {
        console.log('getHebrewDateEverySunset');
        let data = await getHebrewDate();
        data.hebrew = removeNikkud(data?.hebrew);
        copyToGlobalVar(data, hebrewDate);
        const now = DateTime.now();
        let sunset = dayTimes.sunset || (await getDayTimes()).sunset; // if timesData.sunset is undefined, getTimes() will be called
        sunset = DateTime.fromISO(sunset);
        const tomorrow = now.plus({ days: 1 }).startOf('day');
        setTimeout(getHebrewDateEverySunset, sunset - now > 0 ? sunset - now : tomorrow - now);// get the times every sunset
    } catch (err) { console.log(err); }
}

async function getDayTimes() {
    try {
        console.log('getDayTimes');
        const now = DateTime.now();
        const date = now.toISODate();
        const { data: { times } } = await axios.get(`https://www.hebcal.com/zmanim?cfg=json&geonameid=295514&date=${date}`)
        return times;
    } catch (err) { console.log(err); }
}

async function getPrayersTimes() {
    const data = await accessData.getPrayersTimes();
    const dt = Object.keys(dayTimes).length === 0 ? await getDayTimes() : dayTimes;
    const prayersTimes = data.map(p => {
        return {
            ...p,
            time: p.fixed ? p.fixed : calculateTime(p.dependency, p.minutes, dt),
        }
    })
    return prayersTimes;
}

function calculateTime(dependency, mins, dt) {
    let time = DateTime.fromISO(dt[dependency]).plus({ minutes: mins }).toISOTime();
    time = time?.slice(0, 5);
    return time;
}

async function getWeekTimes(now, nextSunday) {
    console.log('getWeekTimes');
    const { data: { items } } = await axios.get(`https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&i=on&M=on&min=on&nx=on&year=now&month=x&start=${now}&end=${nextSunday}&ss=on&mf=on&c=on&geo=geoname&geonameid=295514&M=on&s=on&leyning=off`);
    return items;
}

async function getHebrewDate() {
    try {
        const now = DateTime.now();
        const date = now.toISODate();
        const { data } = await axios.get(`https://www.hebcal.com/converter?cfg=json&date=${date}&g2h=1${await isAfterSunset() && '&gs=on'}`)
        return data;
    } catch (err) { console.log(err); }
}

function removeNikkud(text) {
    return text?.replace?.(/[\u05B0-\u05C4]/g, '');
}

async function isAfterSunset() {
    let sunset = DateTime.fromISO(dayTimes.sunset || (await getDayTimes())?.sunset); // if timesData.sunset is undefined, getTimes() will be called
    const now = DateTime.now();
    if (sunset.day !== now.day) sunset = (await getDayTimes())?.sunset;
    const isAfterSunset = now > DateTime.fromISO(sunset);// if it's after sunset, we need to add gs=on to the url
    return isAfterSunset;
}

async function getTimes() {
    try {
        const times = {}
        times.dayTimes = dayTimes || await getDayTimes();
        times.hebrewDate = hebrewDate || await getHebrewDate();
        times.prayers = prayersTimes || await getPrayersTimes();
        times.items = weekTimes || await services.getWeekTimes();
        times.commissioner = await accessData.getCommissioner(await hebToGreg(times.hebrewDate));
        return times;
    } catch (err) { console.log(err) }
}

async function hebToGreg(hebDate) {
    console.log('hebToGreg');
    console.log(hebDate);
    const { data } = await axios.get(`https://www.hebcal.com/converter?cfg=json&hy=${hebDate.hy}&hm=${hebDate.hm}&hd=${hebDate.hd}&h2g=1`)
    console.log("greg ", data);
    return data.gy + "-" + data.gm + "-" + data.gd;

}

async function addPrayer(prayer) {
    try {
        if (!prayer) throw new Error('no prayer');
        prayer.minutes = Number(prayer.minutes);
        const data = await accessData.addPrayer(prayer);
        copyToGlobalVar((await getPrayersTimes()), prayersTimes)
        return prayersTimes.find(p => p.id === data);
    } catch (err) { console.log(err); }
}

async function updatePrayer(prayer, id) {
    try {
        console.log("updatePrayer", id);
        if (!prayer) throw new Error('no prayer');
        const data = await accessData.updatePrayer(prayer, id);
        copyToGlobalVar((await getPrayersTimes()), prayersTimes)
        return prayersTimes.find(p => p.id === id);
    } catch (err) { console.log(err); }
}

//
// This code copies all the properties of the obj object to the global object.
// This is done to make the properties of obj can be export to another file.
//and not overwrite the object itself.

function copyToGlobalVar(obj, global) {
    Object.keys(obj).forEach(key => {
        global[key] = obj[key];
    })// add the times to the timesData without overwriting the timesData object itself (so that the reference to timesData in the router doesn't change)
}

 async function deletePrayer(prayer_id) {
    console.log("deletePrayer", prayer_id);
        await accessData.deletePrayer(prayer_id);
        const index = prayersTimes.findIndex(p => p.id === prayer_id);  
        prayersTimes.splice(index, 1);
}


getTimesEveryMidnight();
getHebrewDateEverySunset();
getWeekTimesEverySunday();
module.exports = { updatePrayer, dayTimes, hebrewDate, weekTimes, prayersTimes,deletePrayer, addPrayer, getTimes, getDayTimes, getHebrewDate, getPrayersTimes, getWeekTimes, getWeekTimesEverySunday }

