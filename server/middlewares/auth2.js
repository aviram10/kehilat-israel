const hash = require('../utils/hash');
const users = require('../users/services');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const posts = require('../posts/services');
const comments = require('../comments/services');

/**
 * Middleware for user identification.
 * This middleware is responsible for identifying the user based on the provided username and password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
async function identification(req, res, next) {
    try {
        const { username, pass } = req.body;
        if (!username || !pass)
            return res.status(400).send('missing data');
        const [user] = await users.getUsers({ username });
        if (!user || !hash.validate(pass, user.pass))
            return res.status(400).send('username and password do not match');
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
}

/**
 * Middleware for authentication.
 * This middleware is responsible for authenticating the user based on the provided token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
function authentication(req, res, next) {
    try {
        console.log("authentication", req.headers.cookie?.token);
        const { token } = cookie.parse(req.headers.cookie || "");
        if (!token) return next();
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) throw err;
            console.log("authentication", user);
            req.user = user;
        })
        return next();
    } catch (error) {
        console.log(error);
       return next();
    }
}

/**
 * Middleware for admin authorization.
 * This middleware is responsible for authorizing only admin users to access certain routes.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
function adminAuth(req, res, next) {
    if (req.user.role === 'מנהל') return next();
    return res.status(401).send('unauthorized');
}

/**
 * Middleware for user authorization.
 * This middleware is responsible for authorizing only authenticated users to access certain routes.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
function userAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).send('unauthorized');
}

/**
 * Middleware function to check if the authenticated user is the owner of a resource.
 * This middleware is responsible for authorizing only the owner of a resource to access certain routes.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
async function ownerAuth(req, res, next) {
    let user_id;
    if(req.params.user_id) user_id = req.params.user_id;
    else if(req.params.post_id) {
        const post = await posts.getPost(req.params.post_id, false);
        user_id = post.user_id; 
    }
    else if(req.params.comment_id) {
        const [comment] = await comments.getComments(req.params.comment_id);
        user_id = comment.user_id;
    }
    if (req.user.user_id == user_id) return next();
    return res.status(401).send('unauthorized');
}

 function adminORownerAuth(req, res, next) {
    console.log("adminORownerAuth", req.user);
    if (req.user.role === 'מנהל') return next();
     ownerAuth(req, res, next);
    
}

module.exports = { identification, authentication, adminAuth, userAuth, ownerAuth, adminORownerAuth};