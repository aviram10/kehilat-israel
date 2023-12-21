const servises = require("./servises")
const { handleError } = require("../functions")
const { DateTime } = require("luxon");


async function getMessages(req, res) {
    try {
        //create filters object from request query
        const filters = {};
        if (req.query.category) filters.category = req.query.category;
        if (req.query.user_id) filters.user_id = req.query.user_id;
        filters.liked = req.query.liked === "true" ;
        const messages = await servises.getMessages(filters, req.user);
        messages.forEach(message => {
            prepareMessage(message);
        });
        res.send(messages)
    } catch (err) { handleError(err, res) }
}
//rid of unneccesary fields to prepare message for client
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

async function getMessage(req, res) {
    try {
        const [message] = await servises.getMessages({ message_id: req.params.message_id });
        if (!message) return res.sendStatus(404);
        if (req.query.comments == "false") return res.send(message)
        const comments = await servises.getComments(req.params.message_id);
        comments.forEach(comment => prepareMessage(comment))
        return res.send({ message, comments })
    } catch (err) { handleError(err, res) }
}

async function createMessage(req, res) {
    //validate request
    if (!req.body || !req.body.title) return res.sendStatus(400);
    if (!req.body.category) req.body.category = "general";
    //create message
    let message = { 
        title: req.body.title, 
        content: req.body.content, 
        category: req.body.category, 
        user_id: req.user.user_id 
    }
    try {
        message = await servises.createMessage(message);
        res.status(201).send(message);
    } catch (err) { handleError(err, res) }
}

async function deleteMessage(req, res) {
    console.log("deleteMessage: ", req.params.message_id);
    try {
        const data = await servises.deleteMessage(req.params.message_id);
        return res.sendStatus(204);
    } catch (err) { handleError(err, res) }

}

async function editMessage(req, res) {
}

async function deleteAllMessages(req, res) {
}

async function editAllmessages(req, res) {
}

async function updateMessage(req, res) {
    console.log("updatemessages  ", req.params);
    try {
        let data;
        switch (req.params.field) {
            case "likes":
                data = await servises.toggleLike(req.params.message_id, req.user.user_id);
                break;
            default:
                return res.sendStatus(400);
        }
        return res.send(data > 0);
    } catch (err) { handleError(err, res) }
}







module.exports = { getMessages, getMessage, createMessage, deleteMessage, editMessage, deleteAllMessages, editAllmessages, updateMessage }