const accessData = require('./accessData');
const { DateTime } = require('luxon');
const FEES = { commissioner: 250, other: 100 }



async function payDebt({ amount, user_id}) {
    try {
        let [debt] = await accessData.get("debts", { user_id });
        if (!debt) throw new Error("debt not found");
        if (amount < 0) throw new Error("amount must be positive");
       debt.debt = debt.debt - amount;
        await accessData.updateDebt(debt.debt_id, debt.debt);
        return debt
    } catch (err) { console.log(err); }
}


const dedicationPayment = async ({ name, date, type, user_id, donation_id }) => {
    try{
        console.log("dedicationPayment", date, type, user_id);
        const [{insertId}] = await accessData.insert("dedications", {name, date, type, user_id, donation_id});
        const dedication_id = insertId;
        return await accessData.get("dedications", {dedication_id})
    }catch(err){console.log(err)};
}

async function handlePayment(details) {
    console.log("handlePayment", details);
    try {
        const {name, type, date}  = details
        delete details.date;
        delete details.type;
        delete details.name;   
        let result=[];
        if (type === "debt") {result.push(await payDebt(details));}
        const [{ insertId }] = await accessData.insert("donations", details);
        const donation_id = insertId
         result?.push(await accessData.get("donations", {donation_id})[0])
         if (type !== "debt") result?.push(await dedicationPayment({...details, donation_id,name, date, type})[0]);
         console.log("result", result);
        return result
        
    } catch (err) { console.log(err); }
}

async function checkPayment(cart) {
    try {
        if (cart.amount <= 0) return { status: 400, message: "תשלום אי חוקי" };
        switch (cart.type) {
            case "פרנס היום":
                if (cart.amount < FEES.commissioner) return { status: 400, message: "התשלום אינו מתאים " }
                return ( await checkAvialableDate(cart.date)) ? { status: 400, message: "תאריך אינו פנוי" } : { status: 200 };
            default: return cart.amount < 100 ? { status: 400, message: "הסכום אינו מתאים" } : { status: 200 }
        }
    } catch (err) {console.log(err); return { status: 500 } }
}

async function checkAvialableDate(date) {
    let dates = await accessData.get("dedications", { date });
    return dates.find(d => d.type === "פרנס היום")
}




module.exports = {  payDebt, handlePayment, checkAvialableDate, checkPayment };