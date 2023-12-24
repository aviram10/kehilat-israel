const express = require("express");
const router = express.Router();
const { login, register, getUser, getPosts, updateUser } = require("./controllers.js");
const { userAuth } = require("../middlewares/auth.js");

router.post("/login", login)
router.post("/register", register)
router.route("/:user_id")
    .all(userAuth)
    .get(getUser)
    .put(updateUser)

router.get("/:user_id/posts", getPosts)

module.exports = router;