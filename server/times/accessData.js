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

module.exports = {getPrayersTimes};