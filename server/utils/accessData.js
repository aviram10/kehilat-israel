 function extractKeyValues(obj) {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    return { keys, values };
 }

   module.exports = { extractKeyValues }