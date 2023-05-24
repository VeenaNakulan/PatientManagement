const express = require('express');
const router = express.Router();

const { getHostptal, correspondingData, getTimeData } = require('./controller');

router.route('/').get(getHostptal).post(correspondingData);
router.route('/time').post(getTimeData);

module.exports = router;
