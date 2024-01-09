const services = require('./services');

async function getTimes(req, res) {
    try {
        const times = services.getTimes();
        res.json(times);
    } catch (err) { console.log(err); }
}

async function getHebrewDate(req, res) {
    try {
        const hebrewDate = services.hebrewDate.hebrew || await services.getHebrewDate();
        res.send(hebrewDate);
    } catch (err) { console.log(err); }
}



module.exports = { getTimes, getHebrewDate }
