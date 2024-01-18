const services = require("./services");
const accessData = require("./accessData");

async function getDedications(req, res){
    try{
        const [data] = await accessData.getDedications();
        res.json(data);
    }catch(err){
        console.log(err);
    }
}

async function getDonations(req, res){
    try{
        const [data] = await accessData.getDonations();
        res.json(data);
    }catch(err){
        console.log(err);
    }
}

async function getDebts(req, res){
    try{
        const [data] = await accessData.getDebts();
        res.json(data);
    }catch(err){
        console.log(err);
    }
}

async function handlePayment(req, jsonResponse){
    try{
        console.log("reqbody: ", req.body);
        const donationDetails = {
           ...req.body,
           user_id: req.user.user_id
        }
       const data = await services.handlePayment(donationDetails);
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
    const data =  await services.checkPayment(cart)
    return data;
    }catch(err){console.log(err);}
    

}

module.exports = { handlePayment, checkPayment, getDedications, getDonations, getDebts };