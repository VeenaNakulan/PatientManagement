const express = require('express');
const router = express.Router();

const { getPatients, getCountsForPatientDashboard } = require('./controller');

router.route('/admin/patient').get(getPatients);
router.route('/admin/counts').get(getCountsForPatientDashboard);

module.exports = router;
