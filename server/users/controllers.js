const services = require('./services');
const accessData = require('./accessData');
const posts = require('../posts/services');
const { handleError, handleResponse } = require('../utils/response');


async function login(req, res) {
   return  req.user ? res.send(req.user) : res.status(401).send("unidentified")
}
async function register(req, res) {
    try {
        //todo: validate req.body
        delete req.body.remember;
        const [{ insertId }] = await accessData.addUser(req.body);
        const user = await services.getUser(insertId);
        return res.status(201).send(user);
    } catch (err) { handleError(err, res) }
}

async function getUsers(req, res) {
    try{
    const users = await services.getUsers();
    users.forEach(user => delete user.pass)
    return res.send(users);
    }
    catch(err){console.log(err);}
}

async function getUser(req, res) {
    try {
        const [user] = await services.getUsers({user_id: req.params.user_id});
        return res.send(user);
    } catch (err) { return handleError(err, res) }
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
        return res.json(result);
    }catch(err){handleError(err, res)}
}

async function getDebt(req, res) {
    try {
        const debt = await services.getDebt(req.params.user_id);
        return res.json(debt);
    } catch (err) { handleError(err, res) }
}

async function getUserData(req, res) {
    try{
        const data = await services.getUserData(req.params.user_id);
        return res.send(data);
    }catch(err){console.log(err);}

}

async function deleteUser(req, res) {
    try {
        console.log("deleteUser", req.params.user_id);
        await services.deleteUser(req.params.user_id);
        return res.json(req.params.user_id);
    } catch (err) { handleError(err, res) }
}

async function handleDebt(req, res) {
        const action = req.query?.action;
        if(!action) return handleError(new Error("invalid action"),res);
        let data; 
        switch(action){
            case "add": data = await services.addDebt(req, res); break;
            case "pay": data = await payDebt(req, res); break;
            default: return handleError(new Error("invalid action"),res);
        }   
        handleResponse(res, data);
}



module.exports = {handleDebt, deleteUser, getUsers, login, register, getUser, getPosts, updateUser, getDebt, getUserData }