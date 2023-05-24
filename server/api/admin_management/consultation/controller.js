const consultation = require('../../../model/consultation');
const signup = require('../../../model/signup');
const certificate = require('../../../model/ConsultationCert');
const { initiateTask, stopTask } = require('../../../modules/cron/index');
const Web3 = require('web3');

const {
  successMessage,
  errorMessage,
} = require('../../../helpers/commonFunctions');
const transaction = require('../../../model/transaction');

module.exports = {
  getConsultationList: async (req, res) => {
    try {
      const consultationData = await consultation
        .find()
        .populate('departmentId')
        .populate('doctorId')
        .populate('hospitalId');
      return successMessage(res, consultationData);
    } catch (error) {
      return errorMessage(res, error);
    }
  },
  getConsultUser: async (req, res) => {
    try {
      const signupData = await signup.find({ role: 'Patient' });
      return successMessage(res, signupData);
    } catch (error) {
      return errorMessage(res, error);
    }
  },
  generateConsultationCert: async (req, res) => {
    try {
      const { certdata } = req.body;
      // console.log(certdata);

      const web3 = new Web3(
        'https://polygon-mumbai.g.alchemy.com/v2/TDPpwSJ7kw9zMWc-3bS-Dse5O8NF4Uk_'
      );

      const response = await web3.eth.getTransactionReceipt(
        certdata.transactionHash
      );

      const consultCert = await certificate.create({
        certificateNumber: certdata.certificateNumber,
        patientName: certdata.patientName,
        patientUUID: certdata.patientUUID,
        patientRegId: certdata.patientRegId,
        doctorName: certdata.doctorName,
        consultationTime: certdata.consultationTime,
        departmentName: certdata.departmentName,
        hospitalName: certdata.hospitalName,
        issuerName: certdata.issuerName,
        issuerId: certdata.issuerId,
        issuedDateTime: certdata.issuedDateTime,
      });
      const transactions = await transaction.create({
        transactionHash: certdata.transactionHash,
        appointmentType: 'consultCertification',
        loginId: certdata.patientRegId,
        amount: '0.00',
      });

      const transactionOnSuccess = initiateTask('*/5 * * * * *', async () => {
        try {
          if (response.status === true) {
            const data = await transaction
              .updateOne({ _id: transactions.id }, { status: true })
              .exec();
            stopTask(transactionOnSuccess, 'transactionOnSuccess');
          }
        } catch (err) {
          console.log(err);
        }
      });
      return successMessage(res, 'Certificate issued');
    } catch (err) {
      errorMessage(res, err);
    }
  },
};
