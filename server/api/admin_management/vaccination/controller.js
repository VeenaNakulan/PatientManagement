const vaccination = require('../../../model/vaccination');
const {
  successMessage,
  errorMessage,
} = require('../../../helpers/commonFunctions');
const transaction = require('../../../model/transaction');
const vaccineCertificate = require('../../../model/vaccineCertificate');
const { initiateTask, stopTask } = require('../../../modules/cron/index');
const Web3 = require('web3');

module.exports = {
  getVaccinationList: async (req, res) => {
    try {
      const vaccineData = await vaccination
        .find()
        .populate('hospitalId')
        .populate('vaccineId');
      return successMessage(res, vaccineData);
    } catch (error) {
      return errorMessage(res, error);
    }
  },
  generateVaccinationcert: async (req, res) => {
    try {
      const { vaccinedata } = req.body;

      const web3 = new Web3(
        'https://polygon-mumbai.g.alchemy.com/v2/TDPpwSJ7kw9zMWc-3bS-Dse5O8NF4Uk_'
      );

      const response = await web3.eth.getTransactionReceipt(
        vaccinedata.transactionHash
      );

      const vaccineCert = await vaccineCertificate.create({
        certificateNumber: vaccinedata.certificateNumber,
        patientName: vaccinedata.patientName,
        patientUUID: vaccinedata.patientUUID,
        patientRegId: vaccinedata.patientRegId,
        vaccineName: vaccinedata.vaccineName,
        vaccineTakenDatetime: vaccinedata.vaccineTakenDatetime,
        disease: vaccinedata.disease,
        antigen: vaccinedata.antigen,
        issuerName: vaccinedata.issuerName,
        issuerId: vaccinedata.issuerId,
        issuedDateTime: vaccinedata.issuedDateTime,
      });
      const transactions = await transaction.create({
        transactionHash: vaccinedata.transactionHash,
        appointmentType: 'vaccineCertification',
        loginId: vaccinedata.patientRegId,
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
