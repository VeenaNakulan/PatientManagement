var express = require('express');
var router = express.Router();

const { listContact, PatchMessage, DeleteMessage } = require('./controller');

router.route('/admin/enquiry').get(listContact);
router.route('/admin/enquiry/:id').patch(PatchMessage).delete(DeleteMessage);

module.exports = router;
