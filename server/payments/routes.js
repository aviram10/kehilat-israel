const controllers = require('./controllers');
const { adminAuth } = require("../middlewares/auth2");
const paypal = require("./paypal");
const express = require('express');
const router = express.Router();


router.use("/paypal", paypal )
router.route("/")
    .get(adminAuth, controllers.getData)
    // .post(adminAuth, controllers.pay)


module.exports = router;