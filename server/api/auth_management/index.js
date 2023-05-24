const express = require('express');
const router = express.Router();

const { loginData, signupData } = require('./controller');
const { validationSchema } = require('./validator');

router.route('/signup').post(signupData);
router.route('/login').post(loginData);

module.exports = router;
