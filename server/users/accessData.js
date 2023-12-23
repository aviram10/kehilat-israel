const db = require('../database/db');
const util = require('../utils/accessData');

async function getUsers( values, keys = ["user_id"]) {
    try {
        return await db.get("users", ['*'], keys, values);
    } catch (err) { console.log(err); }
}

async function adduser(user) {
    try {
        const { keys, values } = util.extractKeyValues(user);
        return await db.add("users", keys, values);
    } catch (err) { console.log(err); }
}

module.exports = { getUsers }