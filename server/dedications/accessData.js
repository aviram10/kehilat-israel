

const db = require('../database/db');

async function getDedications(filters){
    try {
        return await db.get('dedications', ['*'], Object.keys(filters), Object.values(filters));
    } catch (error) {
        console.error(error);
        throw error;
    }
}
async function addDedication(data){
    try {
        return await db.add('dedications', Object.keys(data), Object.values(data));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// async function main(){
//     console.log(await   getDedications({date: "2024-01-01"}));
// }
// main();

module.exports = {getDedications, addDedication}