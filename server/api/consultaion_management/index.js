const express = require('express');
const router = express.Router();

const { ceateConsultation, getConsultation } = require('./controller');

router.route('/').get(getConsultation).post(ceateConsultation);

module.exports = router;
