const { get } = require("http");
const db = require("../database/db");

async function getMessages(message_id = '*') {
    const messages = await db.get("messages", ['*'], message_id, "message_id");
    return messages[0];
}

async function getComments(message_id) {
    const comments = await db.get("comments", ['*'], message_id, "message_id");
    return comments[0];
}

module.exports = { getMessages, getComments }