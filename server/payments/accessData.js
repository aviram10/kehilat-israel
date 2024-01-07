const db  = require('../database/db');
const util = require('../utils/accessData');

async function getDebts(filters){
    try{
        const {keys, values} = util.extractKeyValues(filters);
        return await db.get("debts", ['*'], keys, values);
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

async function addDonation(amount, donor_id){
    try{
        return await db.add("donations", ["amount", "donor_id"], [amount, donor_id]);
    }catch(err){
        throw err;
    }
}

async function getDate(date){
    try{
    return await db.get("dedication", ['*'], ["date"], [date])
    }catch(err){console.log(err)}
}

module.exports = { getDebts, updateDebt, addDonation, getDate };



