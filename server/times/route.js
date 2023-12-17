const express = require('express');
const controller = require('./controller');
const router = express.Router();
const mw = require('../middlewares/auth');

router.get('/', controller.getTimes);
router.get('/hebrewDate', controller.getHebrewDate);
// router.get('/timesDay', controller.getTimesData);
// router.get('/prayersTimes')
//     // .get("/:category", controller.getPrayersTimes)
//     .route("/")
//     .get(controller.getPrayersTimes)
//     .all(mw.identification, mw.adminAuth)
//     .post(controller.addPrayer)
//     .put(controller.updatePrayer)
//     .delete(controller.deletePrayer);

module.exports = router;



