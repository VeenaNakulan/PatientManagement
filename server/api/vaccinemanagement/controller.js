const vaccination = require('../../model/vaccination');
const vaccine = require('../../model/vaccine');
const transaction = require('../../model/transaction');
const hospital = require('../../model/hospital');
const { initiateTask, stopTask } = require('../../modules/cron/index');
const Web3 = require('web3');

const {
  successMessage,
  errorMessage,
} = require('../../helpers/commonFunctions');

module.exports = {
  getVaccineList: async (req, res) => {
    try {
      const vaccineList = await vaccine.find();
      return successMessage(res, vaccineList);
    } catch (error) {
      return errorMessage(res, error);
    }
  },
  createVaccine: async (req, res) => {
    try {
      let { bookingData, transactionData } = req.body;

      const web3 = new Web3(
        'https://polygon-mumbai.g.alchemy.com/v2/TDPpwSJ7kw9zMWc-3bS-Dse5O8NF4Uk_'
      );

      const response = await web3.eth.getTransactionReceipt(
        transactionData.transactionHash
      );

      let hospitalData = await hospital.findOne({
        _id: bookingData.hospitalId,
      });

      let vaccineList = await vaccine.findOne({
        _id: bookingData.vaccineId,
      });
      //   // insert data to transaction modal
      let transactionDetails = new transaction({
        amount: '0.00',
        appointmentType: 'vaccination',
        transactionHash: transactionData.transactionHash,
        loginId: req.user.id,
      });
      const trans = await transaction.create(transactionDetails);
      //   // insert data to consultation model
      bookingData.hospitalId = hospitalData._id;
      bookingData.vaccineId = vaccineList._id;
      bookingData.loginId = req.user.id;
      bookingData.date = new Date(bookingData.date).setHours(0, 0, 0, 0);
      //   req.body.transactionId = transactionDetails._id;

      const newData = new vaccination({
        hospitalId: bookingData.hospitalId,
        vaccineId: bookingData.vaccineId,
        loginId: bookingData.loginId,
        date: bookingData.date,
        status: 'not-taken',
      });

      const vaccines = await vaccination.create(newData);
      console.log(trans, vaccines);

      const transactionOnSuccess = initiateTask('*/5 * * * * *', async () => {
        try {
          if (response.status === true) {
            const data = await transaction
              .updateOne({ _id: trans.id }, { status: true })
              .exec();
            stopTask(transactionOnSuccess, 'transactionOnSuccess');
          }
        } catch (err) {
          console.log(err);
        }
      });
      return successMessage(
        res,
        'Your Payment is success and booking is confirmed'
      );
    } catch (error) {
      return errorMessage(res, error);
    }
  },
  getEachVaccineData: async (req, res) => {
    try {
      const vaccineData = await vaccination
        .find({ loginId: req.user.id })
        .populate('vaccineId')
        .populate('hospitalId');
      return successMessage(res, vaccineData);
    } catch (error) {
      return errorMessage(res, error);
    }
  },
};
