const services = require("./services");

async function handlePayment(req, amount, jsonResponse){
    try{
       const data = await services.handlePayment(req.body.type, amount, req.user.user_id);
      jsonResponse.data = data;
    }catch(err){
        console.log(err);
    }
}

async function checkPayment(req){
    try{
    let { cart } = req.body;
    cart = cart[0];
    cart.user_id = req.user.user_id;
    return await services.checkPayment(cart)
    }catch(err){console.log(err);}
    

}

module.exports = { handlePayment, checkPayment };