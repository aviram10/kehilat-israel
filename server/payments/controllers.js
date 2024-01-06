const services = require("./services");

async function handlePayment(req, amount, jsonResponse){
    try{
       const data = await services.handlePayment(req.body.type, amount, req.user.user_id);
       console.log(data);
      jsonResponse.data = data;
    }catch(err){
        console.log(err);
    }
}

module.exports = { handlePayment };