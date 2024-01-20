const services = require("./services");
const accessData = require("./accessData")
const {handleResponse} = require("../utils/response")
const {get} = require("../utils/accessData")

async function getData(req, res) {
    const result = await get(data);
    handleResponse(res, result);
}




async function handlePayment(req, jsonResponse) {
    try {
        console.log("reqbody: ", req.body);
        const donationDetails = {
            ...req.body,
            user_id: req.user.user_id
        }
        const data = await services.handlePayment(donationDetails);
        jsonResponse.data = data;
    } catch (err) {
        console.log(err);
    }
}

async function checkPayment(req) {
    try {
        let { cart } = req.body;
        cart = cart[0];
        cart.user_id = req.user.user_id;
        const data = await services.checkPayment(cart)
        return data;
    } catch (err) { console.log(err); }


}

module.exports = { handlePayment, checkPayment, getData};