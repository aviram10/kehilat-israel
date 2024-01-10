const accessData = require( './accessData')
const util = require('../utils/accessData');
const posts = require('../posts/services');

async function getUsers(filters={}) {
    try{
        const [users] = await accessData.getUsers(filters);
        return users;
    }catch(err){console.log(err);}  
}

async function updateUser(user_id, data){
    try{
        //todo: validate data
        const [{affectedRows}] = await accessData.updateUser(user_id, data);
        return affectedRows;
    }catch(err){console.log(err);}
}

async function getDebt(user_id){
    try{
        const [debt] = await accessData.getDebt({user_id});
        return debt[0] ? debt[0].debt : 0;
    }catch(err){console.log(err);}
}

async function getUserData(user_id){
    try{
        const [user] = await getUsers({user_id});
        const debt = await getDebt(user_id);
        const savedPosts = await posts.getPosts({liked: true}, user_id);
        const myPosts = await posts.getPosts({user_id}, user_id);
        return {user, debt, myPosts, savedPosts};
    }catch(err){console.log(err);}
}

async function deleteUser(user_id){
    try{
        const [{affectedRows}] = await accessData.deleteUser(user_id);
        return affectedRows;
    }catch(err){console.log(err);}
}






module.exports = {deleteUser,getUsers, updateUser, getDebt, getUserData}



