const { DateTime } = require('luxon');
const db = require("../database/db");
const dataAccess = require("./dataAccess");

//params: filters: object {key: value} empty object by default, user: object optional
//return: array of objects
async function getMessages(filters = {}, user) {
    try {
        const LikedByUser = filters.liked;
        delete filters.liked;
        const keys = Object.keys(filters);
        const values = Object.values(filters);
        let [messages] = await dataAccess.getMessages(keys, values);
        if (!user) return messages;
        const [likes] = await dataAccess.getLikes(["user_id"], [user.user_id]);
        likes.forEach(like => {
            if (like.message_id) {
                const message = messages.find(m => m.message_id == like.message_id);
                if (message) message.liked = true;
            }
        })
        if (LikedByUser) messages = messages.filter(message => message.liked);
        return messages;
    } catch (err) { console.log(err); }
}

async function getComments(message_id) {
    try {
        const [comments] = await dataAccess.getComments(message_id);
        return comments;
    } catch (err) { console.log(err); }
}

//params: message: object {title: string, content: string, category: string, user_id: number}
//return: message object
async function createMessage(message) {
    try {
        //prepare message for sql
        const columns = Object.keys(message);
        columns.push("date");
        const values = Object.values(message);
        values.push(DateTime.now().toFormat('yyyy-MM-dd'));
        const [{ insertId }] = await db.add("messages", columns, values);
        //get the new message
        const [data] = await getMessages({ message_id: insertId });
        return data;
    } catch (err) { console.log(err); }
}

async function deleteMessage(message_id) {
    //todo: create transaction to delete all the comments and likes of the message 
    try {
        await dataAccess.deleteMessage(message_id);
        return true;
    } catch (err) { console.log(err); }
}

async function editMessage(message_id, data) {
    try {
        //validate data
         await dataAccess.editMessage(message_id, data);
         const [message] = await getMessages({message_id});
        return message;
    } catch (err) { console.log(err); }
}


async function toggleLike(message_id, user_id) {
    try {
        console.log("service togglelike");
        const [messageLikes] = await dataAccess.getLikes(["message_id"], [message_id]);
        const [like] = messageLikes.filter(l => l.user_id == user_id);
        const data = like ?
            await dataAccess.deleteLike(like.like_id, message_id, messageLikes.length) :
            await dataAccess.addLike(user_id, message_id, messageLikes.length);
        return data
    } catch (error) {
        console.log(error);
    }
}

module.exports = {editMessage, getMessages, getComments, createMessage, toggleLike, deleteMessage }