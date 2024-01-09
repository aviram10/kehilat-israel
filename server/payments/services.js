const accessData = require('./accessData');
const { DateTime } = require('luxon');
const FEES = { commissioner: 250, other: 100 }


async function debtPayed(amount, user_id) {
    try {
        let debt = await getDebt(user_id);
        if (!debt[0]) throw new Error("debt not found");
        debt = debt[0]
        debt.debt -= amount;
        await accessData.updateDebt(debt.debt_id, debt.debt);
        await accessData.addDonation(amount, user_id);
        return debt.debt;
    } catch (err) { console.log(err); }
}

async function getDebt(id) {
    try {
        const [debt] = await accessData.getDebts({ user_id: id });
        return debt;
    } catch (err) {
        console.log(err);
    }

}

async function handlePayment(details) {
    try {
        console.log(details);
        switch (details.type) {
            case "debt":
                const debt = await debtPayed(details.amount, details.user_id);
                return debt;
            default:
               const [{insertId}] = await accessData.addDonation(details.amount, details.user_id);
               details.donation_id = insertId
               delete details.details;
               delete details.amount;
               details.date = DateTime.now().toISODate().slice(0,10);
                await accessData.addDedication(details)
                break;
        }
    } catch (err) { console.log(err); }
}

async function checkPayment(cart) {
    try {
        if (cart.amount <= 0) return { status: 400, message: "illigal amount" };
        switch (cart.type) {
            case "debt":
                const debt = getDebt(cart.user_id);
                if (debt < cart.amount) return { status: 400, message: "amount not match" }
                return { status: 200 }
            case "פרנס היום":
                if (cart.amount < FEES.commissioner) return { status: 400, message: "the amount is under the minimum" }
                return await checkAvialableDate(cart.date) ? { status: 400, message: "date unavailable" } : {status: 200};
            default: return cart.amount < 100 ? {status:400, message: "the amount is under the minimum"}: {status:200}
    }
    } catch (err) { return {status: 500} }

}

async function checkAvialableDate(date) {
    let [dates] = await accessData.getDate(date);
    return dates.find(d => d.type === "פרנס היום")
}

// async function main(){
//     try{
//         debtPayed(100, 1000);
//     }catch(err){
//         console.log(err);
//     }
// }
// main()


module.exports = { debtPayed, getDebt, handlePayment, checkAvialableDate, checkPayment };