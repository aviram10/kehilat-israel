
const mysql = require('mysql2/promise');


 const pool = mysql.createPool({
    host: "localhost",
    database: "kehilat-israel",
    password: process.env.COMPUTERNAME === "DESKTOP-B0HJLB4" ? "123456" : "12345678",
    user: "root"
})
async function getPrimaryKey(table) {
    const sqlQuery = `SELECT K.COLUMN_NAME FROM  
     INFORMATION_SCHEMA.TABLE_CONSTRAINTS T
     JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE K
     ON K.CONSTRAINT_NAME=T.CONSTRAINT_NAME  
     WHERE K.TABLE_NAME=?
     AND K.TABLE_SCHEMA='kehilat-israel'  
     AND T.CONSTRAINT_TYPE='PRIMARY KEY' LIMIT 1;`
    const [[{ COLUMN_NAME: primaryKey }]] = await pool.query(sqlQuery, [table])
    return primaryKey;
}
async function update(table, cols, values, key_value) {
        const primaryKey = await getPrimaryKey(table);
        return await pool.query(`UPDATE ${table} SET ${cols.join("=?,")} = ?  WHERE ${primaryKey} = ? `, [...values, key_value])
}

async function get(table, col, key_value, key) {
    //if key not provide default value is the primary key. 
    key = key || await getPrimaryKey(table);
        //where you need all the rows add "" to avoid where.
    if(key_value === '*') table += "--";
    return await pool.query(`SELECT ${col.join(", ")} FROM ${table} WHERE ${key}= ?`, [key_value])
}

async function del(table, value_key, key) {
    key = key || await getPrimaryKey(table)
 return await pool.query(`DELETE FROM ${table} WHERE ${key} = ${value_key}`)
}
async function add(table, cols, values) {
        return await pool.query(`INSERT INTO ${table}(${cols.join(", ")}) VALUES ?`, [values])
}

async function query(sql, values) {
    return await pool.query(sql, values)
}
// async function main(){
//     // console.log("get user => \n"+await get("users", ['*'], "1000"));
//     // console.log("get users => \n"+await get("users--", ['*'], "1000"));
//     // console.log("update user => \n"+await update("users", ["first_name","last_name"],["change", "me"], "1000"));
//     // console.log("add users => \n"+await add("users", ['*'], "1000"));
//     console.log(await pool.query('INS users SET last_name = "cohen"'));
// }
// main()
module.exports = { update, get, add, pool, del, query }