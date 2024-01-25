const db = require('../database/db');
const util = require('../utils/accessData');

async function getPrayersTimes(id) {
    try {
        const [prayersTimes] = await db.get('prayersTimes');
        return prayersTimes;
    } catch (error) {
        console.error('Error retrieving prayers times:', error);
        throw error;
    }
}

async function getPrayer(id) {
    try {
        const [[prayer]] = await db.get('prayersTimes', ['*'], ['id'], [id]);
        return prayer;
    } catch (error) {
        console.error('Error retrieving prayer:', error);
    }
}

async function addPrayer(prayer) {
    try {
        const {keys, values} = util.extractKeyValues(prayer);
        const [{insertId}] = await db.add('prayersTimes', keys, values);
        console.log(insertId);
        return insertId;
    } catch (error) {
        console.error('Error adding prayer:', error);
        throw error;
    }
}

async function updatePrayer(prayer, prayer_id) {
    try {
        const {keys, values} = util.extractKeyValues(prayer);
        console.log(keys, values);
        const [{rawsEffected}] = await db.update('prayersTimes', keys, values, ['id'], [prayer_id]);
        return rawsEffected;
    } catch (error) {
        console.error('Error updating prayer:', error);
        throw error;
    }
}

async function deletePrayer(prayer_id) {
       await db.del('prayersTimes', ['id'], [prayer_id]);
}

async function getCommissioner(date){
    console.log(date);
    const [[commissioner]] = await db.get('dedications',['*'],["date", "type"], [date, "פרנס היום"]);
    return commissioner;    
}

module.exports = {getPrayersTimes, getCommissioner, addPrayer, updatePrayer, getPrayer, deletePrayer};