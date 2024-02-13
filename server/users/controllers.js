const services = require('./services');
const payments = require('../payments/services');
const accessData = require('./accessData');
const posts = require('../posts/services');
const { handleResponse, handleError } = require('../utils/response');


async function login(req, res) {
    return req.user ? res.send(req.user) : res.status(401).send("unidentified")
}
async function register(req, res) {
    try {
        const { username, email, pass, first_name, last_name, phone, address, city, zip} = req.body;
        const details = { username, email, pass, first_name, last_name, phone, address, city, zip };
        Object.keys(details).forEach(key =>{if (details[key] instanceof String)  throw new Error("invalid details")})
        const [{ insertId }] = await services.addUser(details);
        const [user] = await services.getUsers({ user_id: insertId });
        return res.status(201).send(user);
    } catch (err) { 
        console.log(err);
        return res.status(400).send(err.message);
     }
}

async function getUsers(req, res) {
    try {
        const users = await services.getUsers();
        users.forEach(user => delete user.pass)
        return res.send(users);
    }
    catch (err) { console.log(err); }
}

async function getUser(req, res) {
    try {
        const [user] = await services.getUsers({ user_id: req.params.user_id });
        return res.send(user);
    } catch (err) {
        console.log(err);
    }
}

async function getPosts(req, res) {
    try {
        let result = {};
        if (req.params.type === "my")
            result = await posts.getPosts({ user_id: req.params.user_id }, req.user.user_id);
        else if (req.params.type === "saved")
            result = await posts.getPosts({ liked: true }, req.user.user_id);
        else if (!req.params.type) {
            result.myPosts = await posts.getPosts({ user_id: req.params.user_id }, req.user.user_id);
            result.savedPosts = await posts.getPosts({ liked: true }, req.user.user_id);
        }
        else throw new Error("invalid type");
        res.send(result);

    } catch (err) { console.log(err); }
}

async function updateUser(req, res) {
    try {
        const result = await services.updateUser(req.params.user_id, req.body);
        return res.json(result);
    } catch (err) { console.log(err); }
}

async function getDebt(req, res) {
    try {
        const debt = await services.getDebt(req.params.user_id);
        return res.json(debt);
    } catch (err) { console.log(err); }
}

async function getUserData(req, res) {
    try {
        const data = await services.getUserData(req.params.user_id);
        return res.send(data);
    } catch (err) { console.log(err); }

}

async function deleteUser(req, res) {
    try {
        console.log("deleteUser", req.params.user_id);
        await services.deleteUser(req.params.user_id);
        return res.json(req.params.user_id);
    } catch (err) { console.log(err); }
}

async function handleDebt(req, res) {
    try {
        const action = req.query?.action;
        if (!action)  throw new Error("invalid action");
        let data;
        switch (action) {
            case "add": data = await services.addDebt(req.body, req.params.user_id); break;
            case "pay": data = await payments.payDebt(req.body, req.params.user_id); break;
            case "new": return await newDebt(req, res);
            default: throw new Error("invalid action");
        }
        handleResponse(res, data);
    } catch (err) { handleError(res, err);}
}



async function newDebt(req, res) {
    try {
        if(req.params.user_id) req.body.user_id  = req.params.user_id
        if (!req.body) throw new Error("no details sent");
        const result = await services.newDebt(req.body);
        if (result instanceof Error) throw result;
        return res.json(result);
    } catch ({message}) { console.log(message); res.status(400).json({message}); }
}

module.exports = { newDebt, handleDebt, deleteUser, getUsers, login, register, getUser, getPosts, updateUser, getDebt, getUserData }