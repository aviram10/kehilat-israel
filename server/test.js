const {DateTime} = require('luxon');
const axios = require('axios');
const {
    toJewishDate,
    formatJewishDate,
    toHebrewJewishDate,
    formatJewishDateInHebrew,
    toGregorianDate,
    JewishMonth,
  } = require( "jewish-date");
// let now = DateTime.now();
// now = now.plus({days: 1});
// if(now.weekday === 7) now = now.plus({days: 1});
// const nextSunday = now.plus({days: 7}).startOf('week').minus({days: 1});

  
//   const date = new Date("2023-05-09");
  // console.log(formatJewishDateInHebrew(toJewishDate(date)));
  console.log(DateTime.now().toFormat("yyyy-MM"))


  async function getHebrewDate() {
    try {
        const now = DateTime.now();
        const date = now.toISODate();
        const { data } = await axios.get(`https://www.hebcal.com/converter?cfg=json&date=${date}&g2h=1&gs=on`)
        console.log(data);
        const htg = hebToGreg(data)
        return data;
    } catch (err) { console.log(err); }
}

async function hebToGreg(hebDate) {
  console.log('hebToGreg');
  const { data } = await axios.get(`https://www.hebcal.com/converter?cfg=json&hy=${hebDate.hy}&hm=${hebDate.hm}&hd=${hebDate.hd}&h2g=1`)
  data.greg = new Date(data.gy, data.gm - 1, data.gd).toISOString().slice(0, 10);

  console.log(data);
  return data;
}
getHebrewDate();


