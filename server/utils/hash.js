const crypto = require("node:crypto")

const data = []
function hash(password) {
    let salt = crypto.randomBytes(16).toString("base64");
    let hashedPass =  crypto.scryptSync(password, salt, 32).toString("base64");
    hashedPass = hashedPass + "." + salt
   return hashedPass
}

function validate(password, hashedPass){
    const [hashed, salt] = hashedPass.split(".");
    return hashed ===  crypto.scryptSync(password, salt, 32).toString("base64");
}

module.exports = {hash, validate}