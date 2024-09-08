const accessData = require('./accessData')
const util = require('../utils/accessData');
const posts = require('../posts/services');
const validator = require("validator");
const hash = require('../utils/hash');
const jwt = require('jsonwebtoken');


async function login(username, pass, remember = false) {
        if (!username || !pass) throw new Error("missing data");
        const [user] = await getUsers({ username });
        if (!user || user.role ==="לא פעיל" || !hash.validate(pass, user.pass)) throw new Error("username and password do not match");
        const token = jwt.sign({ user_id: user.user_id, username: user.username, role: user.role }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: remember ? "30d" : "6h"});
        return {token, user};
    }


async function getUsers(filters = {}) {
    try {
        const [users] = await accessData.getUsers(filters);
        return users;
    } catch (err) { console.log(err); }
}

async function addUser({username, email, pass, first_name, last_name, phone, address, city, zip}) {
    const details = {username, email, pass, first_name, last_name, phone, address, city, zip};
    if(!details.username || !details.email || !details.pass || !details.first_name || !details.last_name || !details.phone) throw new Error("missing details");
    if (!validator.isEmail(details.email)) throw new Error("invalid email");
    details.pass = hash.hash(details.pass);
    const res = await accessData.addUser(details);
    return res;
}
    

async function updateUser(user_id, data) {
    try {
        //todo: validate data
        const [{ affectedRows }] = await accessData.updateUser(user_id, data);
        return affectedRows;
    } catch (err) { console.log(err); }
}

async function getUserData(user_id) {
    try {
        const [user] = await getUsers({ user_id });
        const debt = await getDebt(user_id);
        const savedPosts = await posts.getPosts({ liked: true }, user_id);
        const myPosts = await posts.getPosts({ user_id }, user_id);
        return { user, debt, myPosts, savedPosts };
    } catch (err) { console.log(err); }
}

async function deleteUser(user_id) {
    try {
        const [{ affectedRows }] = await accessData.deleteUser(user_id);
        return affectedRows;
    } catch (err) { console.log(err); }
}

async function getDebt(user_id) {
    try {
        return await accessData.getDebt({ user_id });
    } catch (err) { console.log(err); }
}

async function addDebt({ amount }, user_id) {
    try {
        const debt = await getDebt(user_id);
        if(!amount) throw new Error("amount is required");
        if (amount < 0) throw new Error("amount must be positive");
        debt.debt += Number(amount);
         await accessData.updateDebt({ amount:debt.debt, user_id });
        return debt;
    } catch (err) { return err }
}

async function newDebt({ amount, user_id }) {
    try {
        if (amount < 0) throw new Error("amount must be positive");
        const data = await accessData.newDebt({ amount, user_id });
        if(data instanceof Error) {
            console.log(data);
            
            throw new Error(" בדוק אם אין כבר חוב קיים או מזהה משתמש תקין")
        };
        return await getDebt(user_id);
    } catch (err) { console.log(err);return err }
}

async function getDebts() {
    try {
        const [data] = await accessData.getDebts();
        return data
    } catch (err) { console.log(err); }
}



module.exports = {getDebts, newDebt, addDebt, deleteUser, getUsers, updateUser, getDebt, getUserData, addUser, login }



