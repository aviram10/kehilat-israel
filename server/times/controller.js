const services = require('./servises');

async function getTimes(req, res) {
    try {
        const times= {}
        times.dayTimes = services.dayTimes || await services.getDayTimes();
        times.hebrewDate = services.hebrewDate.hebrew || await services.getHebrewDate();
        times.prayers =services.prayersTimes || await services.getPrayersTimes();
        times.items= services.weekTimes || await services.getWeekTimes();
        res.json(times);
    } catch (err) { console.log(err); }
}

async function getHebrewDate(req, res) {
    try {
        const hebrewDate = services.hebrewDate.hebrew || await services.getHebrewDate();
        res.json(hebrewDate);
    } catch (err) { console.log(err); }
}



module.exports = { getTimes, getHebrewDate }
