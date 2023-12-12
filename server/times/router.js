const express = require('express');
const controller = require('./controller');
const {timesData} = require('./dayTimes')
const router = express.Router();


router.get("/", (req, res) =>{
    console.log("route  ", timesData);
})
module.exports = router;



