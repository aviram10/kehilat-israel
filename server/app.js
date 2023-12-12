const timesRoter = require('./times/router');
const express = require('express');
const app = express();

app.use(express.json());
app.use("/api/times", timesRoter);