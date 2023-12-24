const express = require("express");
const { getMessages, getMessage, createMessage, deleteMessage, editMessage, updateMessage } = require("./controller");
const {  userId, ownerAuth } = require("../middlewares/auth");

const router = express.Router();

router.route("/")
    .get(getMessages)
    .all(userId)
    .post(createMessage)
router.route("/:message_id")
    .get(getMessage)//params if to send commants. default send
    .all( ownerAuth)
    .delete(deleteMessage) //delete comments
    .put(editMessage)
router.route("/:message_id/:field")
    .all(ownerAuth)
    .put(updateMessage)


module.exports = router;