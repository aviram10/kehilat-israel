

// async function addDedication(req, res) {
//     const { data, type } = req.query;
//     if(!data || !type) return res.status(400).json({ message: 'Missing data' });
//     switch(type){
//         case "cure", "memory": 
//             await services.addDedication(data, type);
//             return res.status(200).json({ message: 'Dedication confirmed' });
//         case "commissioner": 
//             const data = await services.availableDate(data, type)
//             return res.status(200).json(data);
//     }
// }

// module.exports = {addDedication}