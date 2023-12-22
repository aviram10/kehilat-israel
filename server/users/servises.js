const dataAccess = require( './accessData')

//params: filters: object {key: value}
//return: array of objects
async function getUsers(filters){
    try{
        const keys = Object.keys(filters);
        const values = Object.values(filters);
        const [data] = await dataAccess.getUsers(values, keys);
        return data;
    }catch(err){console.log(err);}
}


module.exports = {getUsers}