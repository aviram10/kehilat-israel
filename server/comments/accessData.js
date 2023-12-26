const db = require('../database/db');
const accessData = require('../utils/accessData');

async function getComments(filters) {
    try {
        let {keys, values}= accessData.extractKeyValues(filters);
        keys = keys.map(key => "c." + key)
        const table = "comments c LEFT JOIN users u ON c.user_id = u.user_id";
        const comments = await db.get(table, ['*'], keys, values);
        return comments
    } catch (error) {
        console.log(error);
    }
}

async function addComment( comment ) {
    try {
        const {keys, values}= accessData.extractKeyValues(comment)
        return await db.add("comments", keys, values);
    } catch (error) {
        console.log(error);
    }
}

async function deleteComments( filters ) {
    try {
        const {keys, values}= accessData.extractKeyValues(filters)
        return await db.del("comments",keys, values);
    } catch (error) {
        console.log(error);
    }
}

async function editComments( content, comment_id ) {
    try {
        return await db.update("comments", ["content"],[content], ["comment_id"], [comment_id]);
    } catch (error) {
        console.log(error);
    }
}



module.exports = { getComments, addComment, deleteComments, editComments };