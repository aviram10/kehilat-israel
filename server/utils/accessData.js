const db = require("../database/db")

function extractKeyValues(obj={}) {
   const keys = Object.keys(obj);
   const values = Object.values(obj);
   return { keys, values };
}

async function get(data, filters = {}) {

   try {const { keys, values } = extractKeyValues(filters);
      const [result] = await db.get(data, ['*'], keys, values);
      return result
   } catch (err) {
      console.log(err);
      return err;
   }
}

module.exports = { extractKeyValues, get }