const cookie = require('cookie');
const users = require('../users/services');
const posts = require('../posts/services');
const comments = require('../comments/services');

async function identification(req, res, next) {
    try {
        //get autintication datafrom cookie or body
        console.log("identification...", req.headers.cookie);
        let data = cookie.parse(req.headers.cookie || '');
        if (!data.username || !data.pass) data = req.body;
        if (!data || !data.username || !data.pass) return next();
        //check if user exist and password is correct
        const [user] = await users.getUsers({ username: data.username });
        if (!user|| user.role === "לא פעיל" || user.pass != data.pass) return next();
        req.user = user;
        console.log("identification: ", user.user_id);
        return next();
    } catch (error) { console.log(error); }

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
        console.log("userAuth...");
        if(!req.user) return res.status(401).send('unidentified');
        if(req.user.user_id != req.params.user_id) return res.status(401).send('unauthorized');
        console.log("authorized users");
        return next();
    }catch(err){console.log(err);}
}

async function ownerAuth(req, res, next) {
    try {
        console.log("ownerAuth...");
        if (!req.user) return res.status(401).send('unidentified');
        let data;
        if(req.params.user_id) return userAuth(req, res, next);
        if (req.params.post_id) [data] = await posts.getPosts({ post_id: req.params.post_id });
        else if (req.params.comment_id) [data] = await comments.getComments({comment_id :req.params.comment_id});
        if (!data) return res.status(404).send('not found');
        // console.log("data: ", data.user_id, "req.user: ", req.user.user_id);
        if (data.user_id !== req.user.user_id) return res.status(401).send('unauthorized');
        console.log("authorized");
        return next();
    } catch (err) {
        console.log(err);
    }
    return next();
}

async function adminORownerAuth(req, res, next) {
    try {
        console.log("adminORownerAuth...");
        if (!req.user) return res.status(401).send('unidentified');
        if(req.user.role == "מנהל") return next();
        return ownerAuth(req, res, next);
    } catch (err) {
        console.log(err);
    }
    return next();
}


module.exports = { identification, adminAuth, userId, ownerAuth, userAuth, adminORownerAuth }