var express = require('express');
var router = express.Router();

router.use('/auth', require('../api/auth_management/index'));
router.use('/profile', require('../api/pateint_management/index'));
router.use('/hospital', require('../api/hospital_management/index'));
router.use('/consultation', require('../api/consultaion_management/index'));
router.use('/vaccination', require('../api/vaccinemanagement/index'));
router.use('/', require('../api/admin_management/consultation/index'));
router.use('/', require('../api/admin_management/vaccination/index'));
router.use('/changepassword', require('../api/changepassword/index'));
router.use('/enquiry', require('../api/enquiry_management/index'));
router.use('/', require('../api/admin_management/enquiry/index'));
router.use('/', require('../api/admin_management/counters/index'));
router.use('/', require('../api/admin_management/transactions/index'));

module.exports = router;
