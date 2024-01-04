const express = require("express");
const router = express.Router();
const controllers = require("./controllers.js");
const { userAuth } = require("../middlewares/auth.js");

router.post("/login", controllers.login)
router.post("/register", controllers.register)
router.route("/:user_id")
    .all(userAuth)
    .get(controllers.getUser)
    .put(controllers.updateUser)

router.get("/:user_id/posts", controllers.getPosts)
// router.get("/:user_id/debts", controllers.getDebts)

module.exports = router;