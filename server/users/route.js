const express = require("express");
const router = express.Router();
const controllers = require("./controllers.js");
const { userAuth, adminAuth, adminORownerAuth } = require("../middlewares/auth.js");

router.post("/login", controllers.login)
router.post("/register", controllers.register)
router.get("/", adminAuth, controllers.getUsers)
router.route("/:user_id")
    .all(adminORownerAuth)
    .delete(controllers.deleteUser)
    .get(controllers.getUser)
    .put(controllers.updateUser)
router.post("/debts", adminAuth, controllers.addDebt)
router.get("/:user_id/data", userAuth, controllers.getUserData)
router.route("/:user_id/debt")
    .all(adminORownerAuth)
    .get(controllers.getDebt)
    .all(adminAuth)
    .post(controllers.addDebt)



module.exports = router;