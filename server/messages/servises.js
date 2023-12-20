const { get } = require("http");
const { DateTime } = require('luxon');
const db = require("../database/db");
const dataAccess = require("./dataAccess");
const { handleError } = require("../functions");
const e = require("express");

async function getMessages(user, filters = {}) {
    try {
        const liked = filters.liked;
        delete filters.liked;
        let messages = await dataAccess.getMessages(filters);
        if (!user || filters.user_id) return messages;
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
    } catch (err) { handleError(err, res) }
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
    try {
        const comments = await dataAccess.getComments(message_id);
        comments.forEach(comment => prepareMessage(comment))
        return comments;
    } catch (err) { handleError(err, res) }
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
        handleError(error, res);
    }
}

async function createMessage(message) {
    try {
        const columns = Object.keys(message);
        columns.push("date");
        const values = Object.values(message);
        values.push(DateTime.now().toFormat('yyyy-MM-dd'));
        const [{ insertId }] = await db.add("messages", columns, values);
        const data = await getMessages({ message_id: insertId });
        return data;
    } catch (err) { handleError(err, res) }
}

async function deleteMessage(message_id) {
    try {
        const ids = []
        let [{ insertId }] = await dataAccess.deleteMessage(message_id);
        console.log(insertId);
        ids.push(insertId);
        [{ effectedRows }] = await deleteComments(message_id, "message_id");
        ids.push(effectedRows);
        return ids;
    } catch (err) { console.log(err); }
}

async function deleteComments(id, key = "comment_id") {
    try {
        const [{ effectedRows }] = await dataAccess.deleteComments(message_id, key);
        return effectedRows;
    } catch (err) { handleError(err, res) }
}

module.exports = { getMessages, getComments, createMessage, toggleLike, deleteMessage, deleteComments }