import express from 'express';
const router = express.Router();
import controller from './controller';

router.get('/', controller.getDonations);



module.exports = router;