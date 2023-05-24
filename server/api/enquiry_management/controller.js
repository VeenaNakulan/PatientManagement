const contact = require('../../model/enquiry');
const {
  successMessage,
  errorMessage,
  postData,
} = require('../../helpers/commonFunctions');
const { generatedMail } = require('../../modules/mailer');

module.exports = {
  createContact: async (req, res) => {
    try {
      const data = await postData(contact, req.body);
      if (data) {
        let mailData = {
          from: req.body.email,
          cc: 'veena@spericorn.com',
          subject: 'Contactmessage',
          content: req.body.message,
        };
        await generatedMail(mailData, res);
        successMessage(res, 'Submit successfully');
      }
    } catch (e) {
      errorMessage(res, e.message);
    }
  },
};
