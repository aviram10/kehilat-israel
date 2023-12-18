const { get } = require("http");
const {DateTime} = require('luxon');
const db = require("../database/db");
const dataAccess = require("./dataAccess");
const fs = require("fs/promises");


async function getMessages(filters) {
    const messages = await dataAccess.getMessages(filters);
    messages.forEach(message => {  
        message.date = DateTime.fromSQL(message.date).toFormat('dd-MM-yyyy');
        delete message.first_name;
        delete message.last_name;
        delete message.email;
        delete message.address;
        delete message.city;
        delete message.state;
        delete message.zip;
        delete message.phone;
        delete message.pass;
    });
    console.log(messages);
    return messages;
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
    const data = await getMessages({message_id: insertId});
    console.log(data);
    return data;
}
    getMessages({ user_id: 1000})

module.exports = { getMessages, getComments, createMessage }