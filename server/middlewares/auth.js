const cookie = require('cookie');
const db = require("../database/db");

async function identification(req, res, next) {
    try {
        console.log(req.headers.cookie);
        let data = cookie.parse(req.headers.cookie || '');
        if (!data.username || !data.pass) data = req.body;
        console.log(data);
        if (!data || !data.username || !data.pass) return res.status(401).send('unidentified');
        const [[user]] = await db.get("users", ['*'], data.username, "username");
        if (!user || user.pass != data.pass) return res.status(401).send('unidentified');
        req.user = user;
        return next();
    } catch (error) { console.log(error); }

}
async function adminAuth(req, res, next) {
    if (!req.user) return res.status(401).send('unidentified');
    if (req.user.role != "admin") return res.status(401).send('unauthorized');
    return next();
}

async function auth(req, res, next) {

}

module.exports = { identification, adminAuth, auth }