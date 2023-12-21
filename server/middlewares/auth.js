const cookie = require('cookie');
const users = require('../users/servises');
const messages = require('../messages/servises');
const { handleError } = require('../functions')

async function identification(req, res, next) {
    try {
        //get autintication datafrom cookie or body
        let data = cookie.parse(req.headers.cookie || '');
        if (!data.username || !data.pass) data = req.body;
        if (!data || !data.username || !data.pass) return next();
        //check if user exist and password is correct
        const [user] = await users.getUsers({ username: data.username });
        if (!user || user.pass != data.pass) return next();
        req.user = user;
        console.log("identification: ", user.user_id);
        return next();
    } catch (error) { handleError(error, res) }

}

async function adminAuth(req, res, next) {
    if (!req.user) return res.status(401).send('unidentified');
    if (req.user.role != "admin") return res.status(401).send('unauthorized');
    return next();
}

async function userAuth(req, res, next) {
    req.user ? next() : res.status(401).json("Unauthorized");
}

async function ownerAuth(req, res, next) {
    try {
        console.log("ownerAuth...");
        if (!req.user) return res.status(401).send('unidentified');
        let data;
        if (req.params.message_id) [data] = await messages.getMessages({ message_id: req.params.message_id });
        else if (req.params.comment_id) [data] = await messages.getComments(req.params.comment_id);
        if (!data) return res.status(404).send('not found');
        console.log("data: ", data.user_id, "req.user: ", req.user.user_id);
        if (data.user_id !== req.user.user_id) return res.status(401).send('unauthorized');
        console.log("authorized");
        return next();
    } catch (err) {
        handleError(err, res)
    }
    return next();
}


module.exports = { identification, adminAuth, userAuth, ownerAuth }