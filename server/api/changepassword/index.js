const express = require('express');
const router = express.Router();

const { changePassword } = require('./controller');

router.route('/').post(changePassword);

module.exports = router;
