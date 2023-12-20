const { get } = require('http');
const dataAccess = require( './accessData')

async function getUsers(value, key = "user_id"){
    try{
        const [[data]] = await dataAccess.getUsers(value, key);
        return data;

    }catch(err){console.log(err);}
}


module.exports = {getUsers}