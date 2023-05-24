const express = require('express');
const router = express.Router();

const {
  getVaccineList,
  createVaccine,
  getEachVaccineData,
} = require('./controller');

router.route('/vaccine').get(getVaccineList);
router.route('/').post(createVaccine).get(getEachVaccineData);

module.exports = router;
