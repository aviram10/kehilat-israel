const accessData = require('./accessData');
const { DateTime } = require('luxon');
const FEES = { commissioner: 250, other: 100 }

async function get(data, filters = {}) {
   return accessData.get(data, filters);
}

async function debtPayed(amount, user_id) {
    try {
        let [debt] = await get("debts", { user_id });
        if (!debt[0]) throw new Error("debt not found");
        debt = debt[0]
        debt.debt -= amount;
        await accessData.updateDebt(debt.debt_id, debt.debt);
        await accessData.insert("donations", {amount, user_id});
        return debt.debt;
    } catch (err) { console.log(err); }
}

async function handlePayment(details) {
    try {
        console.log(details);
        switch (details.type) {
            case "debt":
                const debt = await debtPayed(details.amount, details.user_id);
                return debt;
            default:
               const [{insertId}] = await accessData.insert("donations", {amount: details.amount, user_id: details.user_id});
               details.donation_id = insertId
               delete details.details;
               delete details.amount;
              
                await accessData.insert("donations", details)
                break;
        }
    } catch (err) { console.log(err); }
}

async function checkPayment(cart) {
    try {
        if (cart.amount <= 0) return { status: 400, message: "תשלום אי חוקי" };
        switch (cart.type) {
            case "debt":
                const [debt] = get("debts", {user_id: cart.user_id});
                if (debt < cart.amount) return { status: 400, message: "תשלום אינו תואם" }
                return { status: 200 }
            case "פרנס היום":
                if (cart.amount < FEES.commissioner) return { status: 400, message: "התשלום אינו מתאים " }
                return await checkAvialableDate(cart.date) ? { status: 400, message: "תאריך אינו פנוי" } : {status: 200};
            default: return cart.amount < 100 ? {status:400, message: "הסכום אינו מתאים"}: {status:200}
    }
    } catch (err) { return {status: 500} }
}

async function checkAvialableDate(date) {
    let [dates] = await accessData.get("dedications", { date });
    return dates.find(d => d.type === "פרנס היום")
}




module.exports = {get, debtPayed, handlePayment, checkAvialableDate, checkPayment };