const { get } = require("http");
const { DateTime } = require('luxon');
const db = require("../database/db");
const dataAccess = require("./dataAccess");
const fs = require("fs/promises");


async function getMessages(user, filters = {}) {
    const liked = filters.liked;
    delete filters.liked;
    console.log(filters);
    let messages = await dataAccess.getMessages(filters);
    if (!user|| filters.user_id) return messages;
    const likes = await dataAccess.getLikes("user_id", user.user_id);
    likes.forEach(like => {
        if (like.message_id)
            messages.find(message => message.message_id == like.message_id).liked = true;
    })
    
    messages.forEach(message => {
        prepareMessage(message);
    });
    if (liked) {
        messages = messages.filter(message => message.liked);
    }
    return messages;
}
function prepareMessage(message) {
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
}

async function getComments(message_id) {
    const comments = await dataAccess.getComments(message_id);
    comments.forEach(comment => prepareMessage(comment))
    return comments;
}

async function toggleLike(message_id, user_id) {
    try {
        const likes = await dataAccess.getLikes("message_id", message_id);
        const like = likes.find(like => like.user_id === user_id);
        if (like) {
            const data = await dataAccess.deleteLike(like.like_id, likes.length, message_id);
            return data
        }
        const data = await dataAccess.addLike(message_id, user_id, likes.length);

        return data
    } catch (error) {
        console.error(error);
    }
}

async function createMessage(message) {
    const columns = Object.keys(message);
    columns.push("date");
    const values = Object.values(message);
    values.push(DateTime.now().toFormat('yyyy-MM-dd'));
    const [{ insertId }] = await db.add("messages", columns, values);
    const data = await getMessages({ message_id: insertId });
    return data;
}
module.exports = { getMessages, getComments, createMessage, toggleLike }