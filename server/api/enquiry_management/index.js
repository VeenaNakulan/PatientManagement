var express = require('express');
var router = express.Router();

const { createContact } = require('./controller');

router.route('/').post(createContact);

module.exports = router;
