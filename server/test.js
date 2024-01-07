const {DateTime} = require('luxon');
const {
    toJewishDate,
    formatJewishDate,
    toHebrewJewishDate,
    formatJewishDateInHebrew,
    toGregorianDate,
    JewishMonth,
  } = require( "jewish-date");
let now = DateTime.now();
now = now.plus({days: 1});
if(now.weekday === 7) now = now.plus({days: 1});
const nextSunday = now.plus({days: 7}).startOf('week').minus({days: 1});

  
  const date = new Date("2023-05-09");
  // console.log(formatJewishDateInHebrew(toJewishDate(date)));



