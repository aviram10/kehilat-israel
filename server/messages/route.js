const express = require("express");
const { getMessages, getMessage, createMessage, deleteMessage, editMessage, deleteAllMessages, editAllmessages } = require("./controller");
const { auth, adminAuth, identification } = require("../middlewares/auth");
const router = express.Router();

router.route("/")
    .get(getMessages)
    .all(identification)
    .post(createMessage)
    .all(adminAuth)
    .delete( deleteAllMessages)
    .put(editAllmessages)
router.route("/:message_id")
    .get(getMessage)//params if to send commants. default send
    .all(identification, auth)
    .delete(deleteMessage) //delete comments
    .put(editMessage)


module.exports = router;