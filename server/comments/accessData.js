const db = require('../database/db');
const accessData = require('../utils/accessData');

async function getComments(filters) {
    try {
        const {keys, values}= accessData.extractKeyValues(filters)
        return await db.get("comments",['*'], keys, values)
       ;
    } catch (error) {
        console.log(error);
    }
}

async function addComment( comment ) {
    try {
        const {keys, values}= accessData.extractKeyValues(filters)
        return await db.add("comments", { post_id, keys, values });
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

async function editComments( comment_id, content ) {
    try {
        return await db.update("comments", ["content"],[content], ["comment_id"], [comment_id]);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getComments, addComment, deleteComments, editComments };