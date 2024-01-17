require("dotenv").config();
const timesRoter = require('./times/route');
const postsRoute = require("./posts/route")
const usersRoute = require("./users/route")
const paymentRoute = require("./payments/paypalRoute");
const controllers = require("./payments/controllers");
// const dedicationRoute = require("./dedication/route");
const { identification, adminAuth } = require("./middlewares/auth")
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
app.use(identification)
app.use("/api/orders",paymentRoute );
app.use("/api/payments", paymentRoute)
app.use("/api/users", usersRoute);
app.use("/api/times", timesRoter);
app.use("/api/posts", postsRoute);
app.get("/api/dedications",adminAuth, controllers.getDedications);
app.get("/api/donations",adminAuth, controllers.getDonations);
app.get("/api/debts", adminAuth, controllers.getDebts);
