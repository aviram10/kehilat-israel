const services = require('./services');
const payments = require('../payments/services');
const posts = require('../posts/services');
const { handleResponse, handleError } = require('../utils/response');
const validator = require("validator");


async function login(req, res) {
    try {
        const { username, pass, remember } = req.body;
        if (!username || !pass) throw new Error("missing data");
        if (typeof username !== "string" || typeof pass !== "string") throw new Error("invalid data");
        const data = await services.login(username, pass, remember);
        return res.status(200).send(data);
    } catch (err) { return res.status(400).send(err.message); };
}
async function register(req, res) {
    try {
        const { username, email, pass, first_name, last_name, phone, address, city, zip, remember } = req.body;
        const details = { username, email, pass, first_name, last_name, phone, address, city, zip };
        Object.keys(details).forEach(key => { if (details[key] && typeof details[key] !== "string") throw new Error("invalid data") })
        const result = await services.addUser(details);
        if(result instanceof Error){
            if(result.sqlState = '23000') 
                return res.status(400).send('one of the details already exist (phone, email, or username)')
            else return res.status(400).send(result.message)
        }
        const data = await services.login(username, pass, remember);
        return res.status(200).send(data)
    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message);
    }
}

async function getUsers(req, res) {
    try {
        const users = await services.getUsers();
        users.forEach(user => delete user.pass)
        const { start, limit } = req.query;
        if (start && limit) return res.send(users.slice(start, start + limit));
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
        if (!action) throw new Error("invalid action");
        let data;
        switch (action) {
            case "add": data = await services.addDebt(req.body, req.params.user_id); break;
            case "pay": 
                   const details= {amount, payment_method, confirmation} = req.body;  
                   details.user_id = req.params.user_id;
                   details.type = "debt";
                     [data] = await payments.handlePayment(details);
                     console.log("data", data);
             break;
            default: throw new Error("invalid action");
        }
        handleResponse(res, data);
    } catch (err) { handleError(res, err); }
}



async function newDebt(req, res) {
    try {
        if (req.params.user_id) req.body.user_id = req.params.user_id
        if (!req.body) throw new Error("no details sent");
        const result = await services.newDebt(req.body);
        if (result instanceof Error) throw result;
        return res.json(result);
    } catch ({ message }) {
        console.log(message);
        res.status(400).json({ message });
    }
}

async function getDebts(req, res) {
    try {
        const debts = await services.getDebts();
        res.send(debts);
    } catch (err) { console.log(err); }
}

module.exports = { getDebts, newDebt, handleDebt, deleteUser, getUsers, login, register, getUser, getPosts, updateUser, getDebt, getUserData }