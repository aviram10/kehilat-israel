const services = require('./services');
const accessData = require('./accessData');
const posts = require('../posts/services');
const { handleError } = require('../utils/errors');


async function login(req, res) {
    req.user ? res.send(req.user) : res.status(401).send("unidentified")
}
async function register(req, res) {
    try {
        //todo: validate req.body
        delete req.body.remember;
        const [{ insertId }] = await accessData.addUser(req.body);
        const user = await services.getUser(insertId);
        res.status(201).send(user);
    } catch (err) { handleError(err, res) }
}

async function getUser(req, res) {
    try {
        const [user] = await services.getUsers({user_id: req.params.user_id});
        res.send(user);
    } catch (err) { handleError(err, res) }
}

async function getPosts(req, res) {
    try{
        let result = {};
        if(req.params.type === "my" )
            result = await posts.getPosts({user_id: req.params.user_id}, req.user.user_id);
        else if(req.params.type === "saved")
            result = await posts.getPosts({liked: true}, req.user.user_id);
        else if(!req.params.type){
        result.myPosts = await posts.getPosts({user_id: req.params.user_id}, req.user.user_id);
        result.savedPosts = await posts.getPosts({liked: true}, req.user.user_id);
        }
        else throw new Error("invalid type");
        res.send(result);

    }catch(err){handleError(err, res)}
}

async function updateUser(req, res){
    try{
        const result = await services.updateUser(req.params.user_id, req.body);
    }catch(err){handleError(err, res)}
}

async function getDebt(req, res) {
    try {
        const debt = await services.getDebt(req.params.user_id);
        res.send(debt);
    } catch (err) { handleError(err, res) }
}

async function getUserData(req, res) {
    try{
        const data = await services.getUserData(req.params.user_id);
        return res.send(data);
    }catch(err){console.log(err);}

}




module.exports = { login, register, getUser, getPosts, updateUser, getDebt, getUserData }