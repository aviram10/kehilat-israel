const db = require('../database/db');

async function getUsers(value, key = "user_id") {
    try {
     return  await db.get("users", ['*'], value, key);
    } catch (err) { console.log(err); }
}


module.exports = { getUsers }