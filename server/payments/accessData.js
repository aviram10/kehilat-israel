const db = require('../database/db');
const util = require('../utils/accessData');

async function get(table, filters = {}) {
    const { keys, values } = util.extractKeyValues(filters);
    const [data] = await db.get(table, ['*'], keys, values);
    return data;
}

async function updateDebt(id, debt) {
    return await db.update("debts", ["debt"], [debt], ["debt_id"], [id]);
}

async function insert(table, details={}){
    const { keys, values } = util.extractKeyValues(details);
    return await db.add(table, keys, values);

}

module.exports = { updateDebt, insert, get };