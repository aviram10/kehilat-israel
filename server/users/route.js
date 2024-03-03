const express = require("express");
const router = express.Router();
const controllers = require("./controllers.js");
const { adminAuth, adminORownerAuth, userAuth } = require("../middlewares/auth2.js");

router.post("/login", controllers.login)
router.post("/register", controllers.register)
router.get("/", adminAuth, controllers.getUsers)
router.route("/:user_id")
    .all(adminORownerAuth)
    .get(controllers.getUser)
    .delete(controllers.deleteUser)
    .put(controllers.updateUser)
router.get("/:user_id/data", userAuth, controllers.getUserData)
router.route("/debts")
    .all(adminAuth)
    .get(controllers.getDebts)
    .post(controllers.newDebt)
router.route("/:user_id/debt")
    .all(adminORownerAuth)
    .get(controllers.getDebt)
    .all(adminAuth)
    .post(controllers.newDebt)
    .put(controllers.handleDebt)

module.exports = router;