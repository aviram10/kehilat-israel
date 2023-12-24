const servises = require('./servises');
const accessData = require('./accessData');
const posts = require('../posts/servises');
const { handleError } = require('../utils/errors');


async function login(req, res) {
    console.log("login: ", req.user);
    req.user ? res.send({ user_id: req.user.user_id }) : res.status(401).send("unidentified")
}
async function register(req, res) {
    try {
        //todo: validate req.body
        delete req.body.remember;
        const [{ insertId }] = await accessData.addUser(req.body);
        res.status(201).send({ user_id: insertId });
    } catch (err) { handleError(err, res) }
}

async function getUser(req, res) {
    try {
        const [user] = await servises.getUsers({user_id: req.params.user_id});
        res.send(user);
    } catch (err) { handleError(err, res) }
}

async function getPosts(req, res) {
    try{
        let result = {};
        if(req.params.type === "my" )
            result = await posts.getPosts({user_id: req.params.user_id}, req.user);
        else if(req.params.type === "saved")
            result = await posts.getPosts({liked: true}, req.user);
        else if(!req.params.type){
        result.myPosts = await posts.getPosts({user_id: req.params.user_id}, req.user);
        result.savedPosts = await posts.getPosts({liked: true}, req.user);
        }
        else throw new Error("invalid type");
        res.send(result);

    }catch(err){handleError(err, res)}
}

async function updateUser(req, res){
    try{
        const result = await servises.updateUser(req.params.user_id, req.body);
    }catch(err){handleError(err, res)}
}




module.exports = { login, register, getUser, getPosts, updateUser }