const { get } = require("http");
const {DateTime} = require('luxon');
const db = require("../database/db");
const { log } = require("console");


async function getMessages(filters) {
    const values = Object.values(filters);
    const keys = Object.keys(filters);
    console.log(values, keys);
    const messages = await db.get("messages", ['*'], values, keys);
    console.log(messages);
    return messages[0];
}

async function getComments(message_id) {
    const comments = await db.get("comments", ['*'], message_id, "message_id");
    return comments[0];
}

async function createMessage(message) {
    const columns = Object.keys(message);
    columns.push("date");
    const values = Object.values(message);
    values.push(DateTime.now().toFormat('yyyy-MM-dd'));
    const [{insertId}] = await db.add("messages", columns , values);
    const data = await getMessages(insertId);
    return data;
}
    

module.exports = { getMessages, getComments, createMessage }