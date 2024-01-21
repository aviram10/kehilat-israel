const services = require("./services");
const accessData = require("./accessData")
const {handleResponse} = require("../utils/response")
const {get} = require("../utils/accessData")

async function getData(req, res) {
    const result = await get(req.params.data);
    handleResponse(res, result);
}








module.exports = { getData};