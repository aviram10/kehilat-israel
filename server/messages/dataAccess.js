const db = require('../database/db');

async function getMessages(filters) {
    try {
        const values = Object.values(filters);
        const keys = Object.keys(filters);
        let query = `SELECT * FROM messages m LEFT JOIN users u ON m.user_id = u.user_id `;
        if (keys.length) {
            query += `WHERE m.${keys.join('= ? AND m.')}`;
        }
        const messages = await db.query(query, values);
        return messages[0];
    } catch (error) {
        console.error(error);
       
    }
}

async function getComments(message_id) {
    try {
        const table = "comments c JOIN users u ON c.user_id = u.user_id";
        const comments = await db.get(table, ['*'], [message_id], ['message_id']);
        return comments[0];
    } catch (error) {
        console.error(error);
       
    }
}

async function getLikes(filter, value) {
    try {
        const likes = await db.get("likes", ['*'], [value], [filter]);
        return likes[0];
    } catch (error) {
        console.error(error);
    }
}

async function addLike(message_id, user_id, likes) {
    try {
        const like = await db.add("likes", ['message_id', 'user_id'], [message_id, user_id]);
        if (like[0].affectedRows) {
        const [{ affectedRows }] = await db.update("messages", ['likes'], [likes+1], message_id);
        console.log(affectedRows);
        return affectedRows;
    }
    return 0;
    } catch (error) {
        console.error(error);
    }
}

async function deleteLike(like_id, likes, message_id) {
    try {
        const like = await db.del("likes", like_id, 'like_id');
        if (like[0].affectedRows) {
           
        const [{ affectedRows }] = await db.update("messages", ['likes'], [likes-1], message_id);
        console.log(affectedRows);
        return affectedRows;
    }
    return 0;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getMessages, getComments, getLikes, addLike, deleteLike }


