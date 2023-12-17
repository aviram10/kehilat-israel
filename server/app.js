const timesRoter = require('./times/route');
const messagesRoute = require("./messages/route")
const cors = require('cors');
const express = require('express');
const app = express();
app.listen(3010, ()=> console.log("listen on port 3010..."))

let visitors = 0;
app.use(cors())
app.use(express.json());
app.use((req, res, next)=> {
    visitors++;
    console.log("visitors: ", visitors);
    next();
});
app.use("/api/times", timesRoter);
app.use("/api/messages", messagesRoute);
