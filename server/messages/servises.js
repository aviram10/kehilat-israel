const { DateTime } = require('luxon');
const db = require("../database/db");
const dataAccess = require("./dataAccess");
const { handleError } = require("../functions");

//params: filters: object {key: value} empty object by default, user: object optional
//return: array of objects
async function getMessages( filters = {}, user) {
    try {
        const LikedByUser = filters.liked;
        delete filters.liked;
        console.log("getMessages: ", filters);
        const keys = Object.keys(filters);
        const values = Object.values(filters);
        let [messages] = await dataAccess.getMessages(keys, values);
        if ( !user ) return messages;
        const [likes] = await dataAccess.getLikes(["user_id"],[ user.user_id]);
        likes.forEach(like => {
            if (like.message_id){
                const message = messages.find(m => m.message_id == like.message_id);
                if (message) message.liked = true;
            }})
           if ( LikedByUser)  messages = messages.filter(message => message.liked);
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
        const data = await getMessages({ message_id: insertId });
        return [data];
    } catch (err) { handleError(err, res) }
}

async function deleteMessage(message_id) {
    //todo: create transaction to delete all the comments and likes of the message 
    try {
        await dataAccess.deleteMessage(message_id);
        await deleteComments(["message_id"], [message_id]);
        await dataAccess.deleteNMessageLikes(["message_id"], [message_id]); 
        return true;
    } catch (err) { console.log(err); }
}

async function deleteComments(id, key = "comment_id") {
    try {
        const [{ effectedRows }] = await dataAccess.deleteComments([key], [id]);
        return effectedRows;
    } catch (err) { console.log(err); }
}

async function toggleLike(message_id, user_id) {
    try {
        console.log("service togglelike");
        let data;
        const likes = await dataAccess.getLikes("message_id", message_id);
        const like = likes.find(l => l.user_id === user_id);
        if (like) {
            console.log("delete like");
             data = await dataAccess.deleteLike(like.like_id, likes.length, message_id);
            return data
        }
        else  data = await dataAccess.addLike(message_id, user_id, likes.length);
        console.log("add like");
        return data
    } catch (error) {
        handleError(error, res);
    }
}

module.exports = { getMessages, getComments, createMessage, toggleLike, deleteMessage, deleteComments }