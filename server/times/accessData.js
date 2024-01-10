const db = require('../database/db');

async function getPrayersTimes() {
    try {
        const [prayersTimes] = await db.get('prayersTimes');
        return prayersTimes;
    } catch (error) {
        console.error('Error retrieving prayers times:', error);
        throw error;
    }
}



async function getCommissioner(date){
    console.log(date);
    const [[commissioner]] = await db.get('dedications',['*'],["date", "type"], [date, "פרנס היום"]);
    return commissioner;    
}

module.exports = {getPrayersTimes, getCommissioner};