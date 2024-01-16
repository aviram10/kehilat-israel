const express = require("express");
const router = express.Router();
const controllers = require("./controllers.js");
const { userAuth,adminAuth, adminORownerAuth  } = require("../middlewares/auth.js");

router.post("/login", controllers.login)
router.post("/register", controllers.register)
router.get("/", adminAuth, controllers.getUsers)
router.route("/:user_id")
    .all(adminORownerAuth)
    .delete(controllers.deleteUser)
    .get(controllers.getUser)
    .put(controllers.updateUser)

router.get("/:user_id/posts", controllers.getPosts)
router.get("/:user_id/data",userAuth, controllers.getUserData)
router.get("/:user_id/debt",userAuth, controllers.getDebt)

module.exports = router;