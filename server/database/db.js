
const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: "localhost",
    database: "kehilat_israel",
    password: process.env.COMPUTERNAME === "DESKTOP-B0HJLB4" ? "123456" : "12345678",
    user: "root"
})
// async function getPrimaryKey(table) {
//     const sqlQuery = `SELECT K.COLUMN_NAME FROM  
//      INFORMATION_SCHEMA.TABLE_CONSTRAINTS T
//      JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE K
//      ON K.CONSTRAINT_NAME=T.CONSTRAINT_NAME  
//      WHERE K.TABLE_NAME=?
//      AND K.TABLE_SCHEMA='kehilat_israel'  
//      AND T.CONSTRAINT_TYPE='PRIMARY KEY' LIMIT 1;`
//     const [[{ COLUMN_NAME: primaryKey }]] = await pool.query(sqlQuery, [table])
//     return primaryKey;
// }

//params: table: string, cols: array, keys: array, values: array keysValues: array
//return: sql data
async function update(table, cols, values, keys, keysValues) {
    return await pool.query(`UPDATE ${table} SET ${cols.join("=?,")} = ?  WHERE ${keys.join("=?")} = ? `, [...values, ...keysValues])
}


//params: table: string, col: array, key_value: array, key: array
//if keys and values are empty, will return all the rows.
async function get(table, col=['*'], keys = [], values = []) {
    try {
        //where you need all the rows add -- to comment the where condition.
        if (!values[0] || values[0] === '*') table += "--";
        return await pool.query(`SELECT ${col.join(", ")} FROM ${table} WHERE ${keys.join("=? AND ")}= ?`, [...values])
    } catch (e) {
        console.log(e)
    }
}

//params: table: string, keys: array, values: array
//return: sql data
async function del(table, keys =[], values=[]) {
    return await pool.query(`DELETE FROM ${table} WHERE ${keys.join(" = ?")} = ?`, [...values])
}


//params: table: string, cols: array, values: array
//return: sql data
async function add(table, cols, values) {
    try{
    return await pool.query(`INSERT INTO ${table}(${cols.join(", ")}) VALUES (?)`, [values])
    }catch(e){
        console.log(e)
        return e
    }
}

async function query(sql, values) {
    return await pool.query(sql, values)
}
async function main() {
//     // console.log("get user => \n"+await get("users", ['*'], "1000"));
//     // console.log("get users => \n"+await get("users--", ['*'], "1000"));
//     // console.log("update user => \n"+await update("users", ["first_name","last_name"],["change", "me"], "1000"));
//     // console.log("add users => \n"+await add("users", ['*'], "1000"));
//     console.log(await pool.query('INS users SET last_name = "cohen"'));
// console.log(await get("messages", ['*'], ['1000', "ברכות"],[ 'user_id', 'category']));
}
main()



module.exports = { update, get, add, pool, del, query }