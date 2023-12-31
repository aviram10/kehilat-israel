const {DateTime} = require('luxon');

let now = DateTime.now();
now = now.plus({days: 1});
if(now.weekday === 7) now = now.plus({days: 1});
const nextSunday = now.plus({days: 7}).startOf('week').minus({days: 1});
console.log(nextSunday);

