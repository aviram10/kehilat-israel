const db = require('../database/db');
const util = require('../utils/accessData');

async function getPrayersTimes() {
    try {
        const [prayersTimes] = await db.get('prayersTimes');
        return prayersTimes;
    } catch (error) {
        console.error('Error retrieving prayers times:', error);
        throw error;
    }
}

async function addPrayer(prayer) {
    try {
        const {keys, values} = util.extractKeyValues(prayer);
        const [prayerId] = await db.add('prayersTimes', keys, values);
        return prayerId;
    } catch (error) {
        console.error('Error adding prayer:', error);
        throw error;
    }
}

async function updatePrayer(prayer) {
    try {
        const {keys, values} = util.extractKeyValues(prayer);
        const [{rawsEffected}] = await db.update('prayersTimes', keys, values, ['id'], [prayer.id]);
        return rawsEffected;
    } catch (error) {
        console.error('Error updating prayer:', error);
        throw error;
    }
}

async function getCommissioner(date){
    console.log(date);
    const [[commissioner]] = await db.get('dedications',['*'],["date", "type"], [date, "פרנס היום"]);
    return commissioner;    
}

module.exports = {getPrayersTimes, getCommissioner, addPrayer, updatePrayer};