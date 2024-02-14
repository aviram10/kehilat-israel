const hash = require('../utils/hash');
const users = require('../users/services');

async function identification(req, res, next) {
    try {
        const {username, pass} = req.body;
        if (!username || !pass) return res.status(400).send('no');
        const [user] = await users.getUsers({ username });
        if (!user || !hash.validate(pass, user.pass)) return res.status(400).send('unidentified');
    } catch (error) {
        
    }
}