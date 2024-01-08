const db  = require('../database/db');
const util = require('../utils/accessData');

async function getDebts(filters={}){
    try{
        const {keys, values} = util.extractKeyValues(filters);
        return await db.get("debts", ['*'], keys, values);
    }catch(err){
        throw err;
    }
}

async function getDonations(filters={}){
    try{
        const {keys, values} = util.extractKeyValues(filters);
        return await db.get("donations", ['*'], keys, values);
    }catch(err){
        throw err;
    }
}
async function getDedications(filters={}){
    try{
        const {keys, values} = util.extractKeyValues(filters);
        return await db.get("dedications", ['*'], keys, values);
    }catch(err){
        throw err;
    }
}




async function updateDebt(id, debt){
    try{
        return await db.update("debts",["debt"], [debt], ["debt_id"], [id]);
    }catch(err){
        console.log(err);
    }
}

async function addDonation(amount, user_id){
    try{
        return await db.add("donations", ["amount", "user_id"], [amount, user_id]);
    }catch(err){
        throw err;
    }
}

async function getDate(date){
    try{
    return await db.get("dedications", ['*'], ["date"], [date])
    }catch(err){console.log(err)}
}

async function addDedication(details){
    const {keys, values} = util.extractKeyValues(details);
    console.log(keys, values);
    return await db.add("dedications", keys, values);
}

module.exports = { getDebts, updateDebt, addDonation, getDate, addDedication, getDedications, getDonations };



