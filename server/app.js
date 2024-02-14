require("dotenv").config();
const paypal  = require("./payments/paypal")
const timesRoute = require('./times/route');
const postsRoute = require("./posts/route")
const usersRoute = require("./users/route")
const paymentRoute = require("./payments/routes");
const controllers = require("./payments/controllers");
const {  authentication, userAuth, adminAuth } = require("./middlewares/auth2.js");

const cors = require('cors');
const express = require('express');
const app = express();
app.listen(3010, () => console.log("listen on port 3010..."))

let visitors = 0;
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(express.json());
app.use((req, res, next) => {
    visitors++;
    console.log("visitors: ", visitors);
    console.log("req.url: ", req.url);
    console.log("req.body: ", req.body);
    next();
});
app.use(authentication)
app.use("/api/orders", userAuth, paypal );
app.use("/api/payments",userAuth, paymentRoute)
app.use("/api/users", usersRoute);
app.use("/api/times", timesRoute);
app.use("/api/posts", postsRoute);
app.get("/api/:data", adminAuth, controllers.getData);
