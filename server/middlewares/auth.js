const cookie = require('cookie');
const db = require("../database/db");

async function identification (req, res, next) {
    try {
        const cookies = cookie.parse(req.headers.cookie|| '');
    if(!cookies.username || !cookies.pass) return res.status(401).send('unidentified');
    const [[user]] = await db.get("users", ['*'], cookies.username, "username");
    if(!user || user.pass != cookies.pass) return res.status(401).send('unidentified');
    req.user = user;
    return next();
    } catch (error) {console.log(error);}
   
}
async function adminAuth (req, res, next) {
    if(!req.user) return res.status(401).send('unidentified');
    if(req.user.role != "admin") return res.status(401).send('unauthorized');
    return next();
}

async function auth (req, res, next) {
    
}

module.exports = {identification, adminAuth, auth}