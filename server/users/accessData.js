const db = require('../database/db');

async function getUsers( values, keys = ["user_id"]) {
    try {
        return await db.get("users", ['*'], keys, values);
    } catch (err) { console.log(err); }
}


module.exports = { getUsers }