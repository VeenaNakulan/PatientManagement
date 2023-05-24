const contact = require('../../../model/enquiry');
const {
  successMessage,
  errorMessage,
} = require('../../../helpers/commonFunctions');

module.exports = {
  listContact: async (req, res) => {
    try {
      const data = await contact.find();
      successMessage(res, data);
    } catch (e) {
      errorMessage(res, e.message);
    }
  },
  PatchMessage: async (req, res) => {
    try {
      await contact.findByIdAndUpdate(req.params.id, { status: 'read' });
      successMessage(res, 'Updated successfully');
    } catch (e) {
      errorMessage(res, e.message);
    }
  },
  DeleteMessage: async (req, res) => {
    try {
      await contact.findByIdAndDelete(req.params.id);
      successMessage(res, 'Deleted successfully');
    } catch (e) {
      errorMessage(res, e.message);
    }
  },
};
