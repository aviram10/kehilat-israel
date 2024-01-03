const express = require('express');
const { add } = require('../database/db');
const router = express.Router();

router.get("/", availableDate);



module.exports = router;






