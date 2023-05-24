const express = require('express');
const router = express.Router();

const {
  getConsultationList,
  generateConsultationCert,
  getConsultUser,
} = require('./controller');

router.route('/admin/consultation').get(getConsultationList);
router.route('/userdata').get(getConsultUser);
router.route('/issue-consultation').post(generateConsultationCert);

module.exports = router;
