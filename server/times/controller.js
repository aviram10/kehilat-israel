const services = require('./services');

async function getTimes(req, res) {
    try {
        const times = await services.getTimes();
        return res.json(times);
    } catch (err) { console.log(err); }
}

async function getHebrewDate(req, res) {
    try {
        const hebrewDate = services.hebrewDate.hebrew || await services.getHebrewDate();
        return res.send(hebrewDate);
    } catch (err) { console.log(err); }
}

async function addPrayer(req, res) {
    try {
        const prayer = await services.addPrayer(req.body);
       return  res.json(prayer);
    } catch (err) { console.log(err); }
}

async function updatePrayer(req, res) {
    try {
        const prayer = await services.updatePrayer(req.body, req.params.prayer_id);
        return res.json(prayer);
    } catch (err) { console.log(err); }
}

async function deletePrayer(req, res) {
    try {
        const data = await services.deletePrayer(Number(req.params.prayer_id));
        return res.json(data);
    } catch (err) { console.log(err); }
}



module.exports = { getTimes, getHebrewDate, addPrayer, updatePrayer, deletePrayer }
