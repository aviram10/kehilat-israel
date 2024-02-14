const express = require('express');
const controller = require('./controller');
const router = express.Router();
const mw = require('../middlewares/auth2');

router.get('/', controller.getTimes);
router.get('/hebrewDate', controller.getHebrewDate);
router.post('/prayers', mw.adminAuth, controller.addPrayer)

router.route('/prayers/:prayer_id')
    .all(mw.adminAuth)
    .put(controller.updatePrayer)
    .delete(controller.deletePrayer);   
// router.get('/timesDay', controller.getTimesData);
// router.get('/prayersTimes', controller.getTimesData)
//     // .get("/:category", controller.getPrayersTimes)
//     .route("/")
//     .get(controller.getPrayersTimes)
//     .all(mw.identification, mw.adminAuth)
//     .post(controller.addPrayer)
//     .put(controller.updatePrayer)
//     .delete(controller.deletePrayer);

module.exports = router;



