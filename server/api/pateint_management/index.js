const express = require('express');
const router = express.Router();

const {
  getProfiles,
  getDiseases,
  profileGetById,
  updateProfile,
  medicalGetById,
  updateMedical,
  getMedical,
  medicalData,
  getCerticicates,
} = require('./controller');

router.route('/').get(getProfiles);
router.route('/disease').get(getDiseases);
router.route('/medical').get(getMedical).post(medicalData);
router.route('/certificate').get(getCerticicates);
router.route('/:id').get(profileGetById).patch(updateProfile);
router.route('/medical/:id').get(medicalGetById).patch(updateMedical);

module.exports = router;
