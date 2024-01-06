const accessData = require('./accessData');


async function debtPayed(amount, user_id) {
    try {
        if (amount <= 0) throw new Error("Amount must be greater than 0");
       let debt = await getDebt(user_id);
       if(!debt[0]) throw new Error("debt not found");
       debt = debt[0]
        debt.debt -= amount;
        await accessData.updateDebt(debt.debt_id, debt.debt);
        await accessData.addDonation(amount, user_id);
        return debt.debt;
    } catch (err) { console.log(err); }
}

async function getDebt(id){
    try{
        const  [debt] = await accessData.getDebts({user_id: id});
        return debt;
    }catch(err){
       console.log(err);
    }
   
}

async function handlePayment(type, amount, user_id) {
    try {
        if (amount <= 0) throw new Error("Amount must be greater than 0");
        switch (type) {
            case "donation":
                await accessData.addDonation(amount, user_id);
                break;
            case "debt":
                const debt  = await debtPayed(amount, user_id);
                return debt;
            default:
                throw new Error("Invalid payment type");
        }
    } catch (err) { console.log(err); }
}

// async function main(){
//     try{
//         debtPayed(100, 1000);
//     }catch(err){
//         console.log(err);
//     }
// }
// main()


module.exports = { debtPayed, getDebt, handlePayment };