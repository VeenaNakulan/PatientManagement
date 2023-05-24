const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { errorMessage } = require('../helpers/commonFunctions');

exports.generatedMail = async (data, res) => {
  try {
    const { to, content, subject, cc, bcc, from } = data;
    let mailTransporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    ejs.renderFile('views/contact.ejs', { content }, (err, data) => {
      mailDetails = {
        cc: cc,
        to: to,
        from: from,
        subject: 'Contact Message',
        html: data,
      };
    });

    mailTransporter.sendMail(mailDetails);
    // return true;
  } catch (e) {
    console.log(e.message);
  }
};
