const transaction = require('../../../model/transaction');
const signup = require('../../../model/signup');

const {
  successMessage,
  errorMessage,
} = require('../../../helpers/commonFunctions');

module.exports = {
  getTransactions: async (req, res) => {
    try {
      //   const data = await transaction.find().populate('loginId');
      //   const signupData = await signup
      //     .find({ role: 'Patient' })
      //     .populate('loginId');

      //   console.log(data);
      //   console.log(signupData);
      const data = await transaction.aggregate([
        {
          $lookup: {
            from: 'signups', // Name of the collection to perform the reverse aggregation on
            localField: 'loginId',
            foreignField: 'loginId',
            as: 'signupData',
          },
        },
      ]);
      console.log(data);
      // .populate('departmentId')
      // .populate('doctorId')
      // .populate('hospitalId');
      return successMessage(res, data);
    } catch (error) {
      return errorMessage(res, error);
    }
  },
};
