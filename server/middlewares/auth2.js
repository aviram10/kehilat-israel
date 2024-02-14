const hash = require('../utils/hash');
const users = require('../users/services');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');

async function identification(req, res, next) {
    try {
        const {username, pass} = req.body;
        if (!username || !pass) return res.status(400).send('missing data');
        const [user] = await users.getUsers({ username });
        if (!user || !hash.validate(pass, user.pass)) return res.status(400).send('username and password do not match');
        req.user = user;
        next();
    } catch (error) {
      console.log(error);  
    }
}

async function authentication(req, res, next){
    try {
        const {token} = cookie.parse(req.headers.cookie);
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) throw err;
            req.user = user;
        })
        
    } catch (error) {
        return next();
    }
}

module.exports = {identification, authentication};