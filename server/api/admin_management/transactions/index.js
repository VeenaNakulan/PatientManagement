var express = require('express');
var router = express.Router();

const { getTransactions } = require('./controller');

router.route('/admin/transactions').get(getTransactions);

module.exports = router;
