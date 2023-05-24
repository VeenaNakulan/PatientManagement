const hospital = require('../../model/hospital');
const department = require('../../model/department');
const transaction = require('../../model/transaction');
const consultation = require('../../model/consultation');
const {
  successMessage,
  errorMessage,
} = require('../../helpers/commonFunctions');
const { initiateTask, stopTask } = require('../../modules/cron/index');
const Web3 = require('web3');

module.exports = {
  ceateConsultation: async (req, res) => {
    try {
      let { bookingData, transactionData } = req.body;

      const web3 = new Web3(
        'https://polygon-mumbai.g.alchemy.com/v2/TDPpwSJ7kw9zMWc-3bS-Dse5O8NF4Uk_'
      );

      const response = await web3.eth.getTransactionReceipt(
        transactionData.transactionHash
      );

      let hospitalData = await hospital.findOne({
        hospitalId: bookingData.hospitalId,
      });

      let departmentData = await department.findOne({
        departmentId: bookingData.departmentId,
      });

      // insert data to transaction modal
      let transactionDetails = new transaction({
        amount: '0.00',
        appointmentType: 'consultation',
        transactionHash: transactionData.transactionHash,
        loginId: req.user.id,
      });

      const trans = await transaction.create(transactionDetails);

      // insert data to consultation model

      bookingData.hospitalId = hospitalData.id;
      bookingData.departmentId = departmentData.id;
      bookingData.loginId = req.user.id;
      bookingData.date = new Date(bookingData.date).setHours(0, 0, 0, 0);

      const newConsult = new consultation({
        hospitalId: bookingData.hospitalId,
        departmentId: bookingData.departmentId,
        loginId: bookingData.loginId,
        date: bookingData.date,
        status: 'pending',
        transactionId: trans._id,
        time: bookingData.time,
        doctorId: bookingData.doctorId,
      });
      const consult = await consultation.create(newConsult);

      console.log(trans, consult);

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
        'Your Payment is Success and booking is Confirmed'
      );
    } catch (error) {
      return errorMessage(res, error);
    }
  },
  getConsultation: async (req, res) => {
    try {
      const consultationData = await consultation
        .find({
          loginId: req.user.id,
        })
        .populate('departmentId')
        .populate('doctorId')
        .populate('hospitalId');
      return successMessage(res, consultationData);
    } catch (error) {
      return errorMessage(res, error);
    }
  },
};
