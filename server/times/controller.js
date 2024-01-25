const services = require('./services');
const { handleError } = require('../utils/response');

async function getTimes(req, res) {
    try {
        const times = await services.getTimes();
        return res.json(times);
    } catch (err) { handleError }
}

async function getHebrewDate(req, res) {
    try {
        const hebrewDate = services.hebrewDate.hebrew || await services.getHebrewDate();
        return res.send(hebrewDate);
    } catch (err) { handleError }
}

async function addPrayer(req, res) {
    try {
        const prayer = await services.addPrayer(req.body);
       return  res.json(prayer);
    } catch (err) { handleError }
}

async function updatePrayer(req, res) {
    try {
        console.log("controllers" , req.params);
        console.log("updatePrayer", req.params.prayer_id);
        const prayer = await services.updatePrayer(req.body, req.params.prayer_id);
        return res.json(prayer);
    } catch (err) { handleError }
}

async function deletePrayer(req, res) {
    try {
        const prayer_id = Number(req.params.prayer_id)
        await services.deletePrayer(prayer_id);
        return res.json(prayer_id);
    } catch (err) { handleError }
}



module.exports = { getTimes, getHebrewDate, addPrayer, updatePrayer, deletePrayer }
