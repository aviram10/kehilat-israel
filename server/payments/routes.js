import controllers from './controllers';
import {adminAuth} from "../middlewares/auth";
const paypal = require("./paypal")
import express from 'express';
const router = express.Router();


router.use("/paypal", paypal )
router.route("/")
    .get(adminAuth, controllers.getData);
    .post(adminAuth, controllers.pay);


module.exports = router;