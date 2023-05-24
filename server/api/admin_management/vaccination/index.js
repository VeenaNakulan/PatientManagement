const express = require('express');
const router = express.Router();

const { getVaccinationList, generateVaccinationcert } = require('./controller');

router.route('/admin/vaccination').get(getVaccinationList);
router.route('/issue-vaccination').post(generateVaccinationcert);

module.exports = router;
