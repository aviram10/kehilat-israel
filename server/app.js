const timesRoter = require('./times/route');
const cors = require('cors');
const express = require('express');
const app = express();
app.listen(3010, ()=> console.log("listen on port 3010..."))
app.use(cors())
app.use(express.json());
app.use("/api/times", timesRoter);