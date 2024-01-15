const services = require('./services');

async function getTimes(req, res) {
    try {
        const times = await services.getTimes();
        res.json(times);
    } catch (err) { console.log(err); }
}

async function getHebrewDate(req, res) {
    try {
        const hebrewDate = services.hebrewDate.hebrew || await services.getHebrewDate();
        res.send(hebrewDate);
    } catch (err) { console.log(err); }
}

async function addPrayer(req, res) {
    try {
        const prayer = await services.addPrayer(req.body);
        res.json(prayer);
    } catch (err) { console.log(err); }
}



module.exports = { getTimes, getHebrewDate, addPrayer }
