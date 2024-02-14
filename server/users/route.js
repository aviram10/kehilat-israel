const express = require("express");
const router = express.Router();
const controllers = require("./controllers.js");
const { userAuth, adminAuth, adminORownerAuth } = require("../middlewares/auth.js");
const { identification, authentication } = require("../middlewares/auth2.js");

router.post("/login", controllers.login)
router.post("/register", controllers.register)
router.get("/", adminAuth, controllers.getUsers)
router.route("/:user_id")
    .all(adminORownerAuth)
    .get(controllers.getUser)
    .delete(controllers.deleteUser)
    .put(controllers.updateUser)
router.get("/:user_id/data", userAuth, controllers.getUserData)
router.post("/debts", adminAuth, controllers.newDebt)
router.route("/:user_id/debt")
    .all(adminORownerAuth)
    .get(controllers.getDebt)
    .all(adminAuth)
    .post(controllers.handleDebt)



module.exports = router;