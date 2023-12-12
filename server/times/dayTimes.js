const { DateTime } = require("luxon")
const axios = require('axios');
let timesData = {};

async function getTimes() {
    const date = DateTime.now();
    const currentDate = date.toISODate();
    const { data: { times } } = await axios.get(`https://www.hebcal.com/zmanim?cfg=json&geonameid=295514&date=${currentDate}`)
    timesData = times;
    return times;
}
 getTimes();

module.exports = { timesData, getTimes }

