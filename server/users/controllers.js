const servises = require('./servises');
const accessData = require('./accessData');
const messages = require('../messages/servises');
const { handleError } = require('../utils/errors');


async function login(req, res) {
    console.log("login: ", req.user);
    req.user ? res.send({ user_id: req.user.user_id }) : res.status(401).send("unidentified")
}
async function register(req, res) {
    try {
        //todo: validate req.body
        delete req.body.remember;
        const [{ insertId }] = await accessData.addUser(req.body);
        res.status(201).send({ user_id: insertId });
    } catch (err) { handleError(err, res) }
}

async function getUser(req, res) {
    try {
        const [user] = await servises.getUsers({user_id: req.params.user_id});
        res.send(user);
    } catch (err) { handleError(err, res) }
}

async function getMessages(req, res) {
    try{
        let result = {};
        if(req.params.type === "my" )
            result = await messages.getMessages({user_id: req.params.user_id}, req.user);
        else if(req.params.type === "saved")
            result = await messages.getMessages({liked: true}, req.user);
        else if(!req.params.type){
        result.myMessages = await messages.getMessages({user_id: req.params.user_id}, req.user);
        result.savedMessages = await messages.getMessages({liked: true}, req.user);
        }
        else throw new Error("invalid type");
        res.send(result);

    }catch(err){handleError(err, res)}
}

async function updateUser(req, res){
    try{
        const result = await servises.updateUser(req.params.user_id, req.body);
    }catch(err){handleError(err, res)}
}




module.exports = { login, register, getUser, getMessages, updateUser }