const accessData = require('./accessData')
const util = require('../utils/accessData');
const posts = require('../posts/services');
const validator = require("validator");

async function getUsers(filters = {}) {
    try {
        const [users] = await accessData.getUsers(filters);
        return users;
    } catch (err) { console.log(err); }
}

async function addUser(data) {
    if (data.username || data.email || data.pass || !data.first_name || data.last_name || data.phone)
         throw new Error("missing details");
    if (!validator.isEmail(data.email)) throw new Error("invalid email");
    if (!validator.isMobilePhone(data.phone, "he-IL")) throw new Error("invalid phone number");

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
        if(data instanceof Error) throw new Error("בדוק אם אין כבר חוב קיים");
        return await getDebt(user_id);
    } catch (err) { console.log(err);return err }
}



module.exports = { newDebt, addDebt, deleteUser, getUsers, updateUser, getDebt, getUserData }



