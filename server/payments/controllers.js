const services = require("./services");

async function handlePayment(req, amount, jsonResponse){
    try{
       const data = await services.handlePayment(req.body.type, amount, req.user.user_id);
      jsonResponse.data = data;
    }catch(err){
        console.log(err);
    }
}

async function checkPayment(req, res){
    const { cart } = req.body;
    

}

module.exports = { handlePayment };