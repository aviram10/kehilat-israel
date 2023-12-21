const db = require('../database/db');
const { handleError } = require('../functions');

//GET
//------

//params: keys: array of strings, values: array of values
//return: array of sql data
//if keys is empty return all messages
async function getMessages(keys = [], values = []) {
    try {
        //add user data to messages table
        keys = keys.map(key => "m." + key)
        const table = "messages m LEFT JOIN users u ON m.user_id = u.user_id";
        const messages = await db.get(table, ['*'], keys, values);
        return messages;
    } catch (error) {

    }
}

async function getComments(message_id) {
    try {
        const table = "comments c JOIN users u ON c.user_id = u.user_id";
        const comments = await db.get(table, ['*'],['message_id'] , [message_id]);
        return comments;
    } catch (error) {
        console.log(error)

    }
}

//params: keys: array of strings, values: array of strings
//return: array of sql data
async function getLikes(keys = [], values = []) {
    try {
        const likes = await db.get("likes", ['*'], keys, values);
        return likes;
    } catch (error) {
        handleError(error, res)
    }
}

//================================================
//ADD

async function createMessage(cols, values) {
    try {
        return await db.add("messages", cols, values);
    } catch (error) {
       console.log(error);
    }
}

async function addLike(message_id, user_id, likes) {
    try {
        const like = await db.add("likes", ['message_id', 'user_id'], [message_id, user_id]);
        if (like[0].affectedRows) {
            const [{ affectedRows }] = await db.update("messages", ['likes'], [likes + 1], message_id);
            return affectedRows;
        }
        return 0;
    } catch (error) {
        handleError(error, res)
    }
}

async function deleteLike(like_id, likes, message_id) {
    try {
        const like = await db.del("likes", like_id, 'like_id');
        if (like[0].affectedRows) {

            const [{ affectedRows }] = await db.update("messages", ['likes'], [likes - 1], message_id);
            return affectedRows;
        }
        return 0;
    } catch (error) {
        handleError(error, res)
    }
}

async function deleteMessage(message_id) {
    try {
        const data = await db.del("messages", ['message_id'],[ message_id]);
        return data;
    } catch (error) {
        console.log(error)
    }
}


async function deleteComments(keys=[], values =[]) {
    try {
        const data = await db.del("comments", keys, values);
        return data;
    } catch (error) {
        console.log(data)
    }
}


async function deleteNMessageLikes(keys =[], values =[]) {
    try {
        const data = await db.del("likes", message_id, 'message_id');
        return data;
    } catch (error) {
        console.log(data)
    }
}

module.exports = {createMessage, getMessages, getComments, getLikes, addLike, deleteLike, deleteMessage, deleteComments, deleteNMessageLikes }


