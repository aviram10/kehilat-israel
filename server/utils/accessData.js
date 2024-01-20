const db = require("../database/db")

function extractKeyValues(obj) {
   const keys = Object.keys(obj);
   const values = Object.values(obj);
   return { keys, values };
}

async function get(data, filters = {}) {
   try {
      const result = await db.get(data, filters);
   } catch (err) {
      console.log(err);
      return err;
   }
}

module.exports = { extractKeyValues, get }