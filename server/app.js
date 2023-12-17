const timesRoter = require('./times/route');
const messagesRoute = require("./messages/route")
const { identification } = require("./middlewares/auth")
const cors = require('cors');
const express = require('express');
const app = express();

let visitors = 0;
app.use(cors())
app.use(express.json());
app.use((req, res, next) => {
    visitors++;
    console.log("visitors: ", visitors);
    next();
});
app.get("/login", identification, (req, res) => { res.send(req.user.user_id) });
app.get("/login", (req, res) => { });
app.use("/api/times", timesRoter);
app.use("/api/messages", messagesRoute);

app.listen(3010, () => console.log("listen on port 3010..."))