const db= require('../database/db');

async function getMessages(filters) {
    const values = Object.values(filters);
    const keys = Object.keys(filters);
    
    
    query = `SELECT * FROM messages m JOIN users u ON m.user_id = u.user_id `;
    if (keys.length) {
        query += `WHERE m.${keys.join( '= ? AND m.')} = ?`;
    }
    const messages = await db.query(query, values);
    console.log(messages[0]);
    return messages[0];
}

module.exports = { getMessages }

// getMessages({ user_id: 1000})

