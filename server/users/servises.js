const accessData = require( './accessData')
const util = require('../utils/accessData');
const posts = require('../posts/servises');



async function getUsers(filters) {
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




module.exports = {getUsers, updateUser}