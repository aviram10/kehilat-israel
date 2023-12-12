const { DateTime } = require("luxon")
const axios = require('axios');
let timesData = {};

async function getTimes() {
    try{
         const date = DateTime.now();
    console.log(date);
    const currentDate = date.toISODate();
    console.log(currentDate);
    const { data: { times } } = await axios.get(`https://www.hebcal.com/zmanim?cfg=json&geonameid=3448439&date=2021-03-23`)
    Object.keys(times).forEach(key => {
        timesData[key] = times[key];
    })
    console.log(timesData);
    return times; 
    }catch(err){console.log(err);}
  
}
 getTimes();

module.exports = { timesData, getTimes }

