const accessData = require('./accessData.js');
const pendingDates = [];

async function offer(data){
    if(pendingDates.includes(data.date)) return { status: "pending" };
    const [dedications] = await accessData.getDedications({date: data.date});
    console.log(dedications);
    dedications.forEach(dedication => {
        console.log(dedication);
        if(dedication.category === data.category) return { status: "unavailable" };
    });
    pendingDates.push(data.date);
    return { status: "available" };
}

// async function main(){
//     console.log(await offer({date: "2024-01-02", category: "פרנס היום"}));
//     console.log(pendingDates);
//     console.log(await offer({date: "2024-01-01", category: "commissioner"}));
// }
// main();

module.exports = {offer}