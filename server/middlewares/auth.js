const cookie = require('cookie');
const users = require('../users/services');
const posts = require('../posts/services');
const comments = require('../comments/services');
const { handleError } = require('../utils/errors')

async function identification(req, res, next) {
    try {
        //get autintication datafrom cookie or body
        console.log("identification...", req.headers.cookie);
        let data = cookie.parse(req.headers.cookie || '');
        if (!data.username || !data.pass) data = req.body;
        if (!data || !data.username || !data.pass) return next();
        //check if user exist and password is correct
        const [user] = await users.getUsers({ username: data.username });
        if (!user|| user.role === "inactive" || user.pass != data.pass) return next();
        req.user = user;
        console.log("identification: ", user.user_id);
        return next();
    } catch (error) { handleError(error, res) }

}

async function adminAuth(req, res, next) {
    if (!req.user) return res.status(401).send('unidentified');
    if (req.user.role != "מנהל") return res.status(401).send('unauthorized');
    return next();
}

async function userId(req, res, next) {
    req.user ? next() : res.status(401).json("Unauthorized");
}

async function userAuth(req, res, next) {
    try{
        if(!req.user) return res.status(401).send('unidentified');
        if(req.user.user_id != req.params.user_id) return res.status(401).send('unauthorized');
        return next();
    }catch(err){handleError(err, res)}
}

async function ownerAuth(req, res, next) {
    try {
        console.log("ownerAuth...");
        if (!req.user) return res.status(401).send('unidentified');
        let data;
        if (req.params.post_id) [data] = await posts.getPosts({ post_id: req.params.post_id });
        else if (req.params.comment_id) [data] = await comments.getComments({comment_id :req.params.comment_id});
        if (!data) return res.status(404).send('not found');
        // console.log("data: ", data.user_id, "req.user: ", req.user.user_id);
        if (data.user_id !== req.user.user_id) return res.status(401).send('unauthorized');
        console.log("authorized");
        return next();
    } catch (err) {
        handleError(err, res)
    }
    return next();
}

async function adminORownerAuth(req, res, next) {
    try {
        console.log("adminORownerAuth...");
        if (!req.user) return res.status(401).send('unidentified');
        if(req.user.role == "מנהל") return next();
        ownerAuth(req, res, next);
    } catch (err) {
        handleError(err, res)
    }
    return next();
}


module.exports = { identification, adminAuth, userId, ownerAuth, userAuth, adminORownerAuth }