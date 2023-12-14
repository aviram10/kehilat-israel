const services = require('./servises');

async function getTimes(req, res) {
    try {
        const times = services.timesData || await services.getDayTimes();
        times.hebrewDate = services.hebrewDate.hebrew || await services.getHebrewDate();
        times.prayers = await services.getPrayersTimes();
        times.items= 
        res.json(times);
    } catch (err) { console.log(err); }
}

async function getHebrewDate(req, res) {
    try {
        const hebrewDate = services.hebrewDate.hebrew || await services.getHebrewDate();
        res.json(hebrewDate);
    } catch (err) { console.log(err); }
}

async function getTimesData(req, res) {
    try {
        const times = services.timesData || await services.getTimes();
        res.json(times);
    } catch (err) { console.log(err); }
}

async function getPrayersTimes(req, res) {
    try {
        const times = await services.getPrayersTimes();
        res.json(times);
    } catch (err) { console.log(err); }
}




module.exports = { getTimes, getHebrewDate, getTimesData }
