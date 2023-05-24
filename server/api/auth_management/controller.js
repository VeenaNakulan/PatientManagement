const login = require('../../model/login');
const {
  successMessage,
  errorMessage,
  postData,
} = require('../../helpers/commonFunctions');
const signup = require('../../model/signup');
const { passwordHashing } = require('../../modules/passwordHash');

module.exports = {
  loginData: async (req, res) => {
    try {
      const { email, password } = req.body;
      let user = await login.findOne({ email });
      if (!user) {
        return errorMessage(res, {
          message: 'Invalid email or password',
        });
      }
      if (!(await login.verifyPassword(password, user.password, user.salt))) {
        return errorMessage(res, {
          message: 'Invalid email or password',
        });
      }
      let userRole = await signup.findOne({ loginId: user._id });

      const accessToken = await login.generateAuthTocken(user);
      const refreshTocken = await login.generateAuthTocken(user);
      user.accessToken = accessToken;
      await user.save();

      return successMessage(
        res,
        { accessToken, refreshTocken, role: userRole.role },
        'Login Successfully'
      );
    } catch (e) {
      return errorMessage(res, e);
    }
  },
  signupData: async (req, res) => {
    try {
      const isExistingdata = await login.findOne({
        email: req.body.email,
      });
      if (isExistingdata) {
        return errorMessage(res, {
          message: 'Data already exist',
        });
      } else {
        // password hash
        let { salt, newPassword } = await passwordHashing(req.body.password);
        // login create
        const loginData = await postData(login, {
          email: req.body.email,
          password: newPassword,
          salt,
        });

        // signup create
        const signupData = await postData(signup, {
          name: req.body.name,
          phoneNumber: req.body.phoneNumber,
          role: 'Patient',
          loginId: loginData.id,
        });
        return successMessage(res, 'Registered successfully');
      }
    } catch (e) {
      return errorMessage(res, e);
    }
  },

  //   listAdmins: async (req, res) => {
  //     try {
  //       const adminData = await login.find({});
  //       return commonFunction.successMessage(res, adminData, {
  //         message: 'Details of Admins',
  //       });
  //     } catch (e) {
  //       return commonFunction.errorMessage(res, e);
  //     }
  //   },
  //   updateAdmins: async (req, res) => {
  //     try {
  //       req.body.image = req.file ? req.file.path : req.body.image;
  //       await login.findByIdAndUpdate(req.params.id, req.body);
  //       return commonFunction.successMessage(res, {
  //         message: 'Data updated successfully',
  //       });
  //     } catch (e) {
  //       return commonFunction.errorMessage(res, e);
  //     }
  //   },

  //   viewData: async (req, res) => {
  //     try {
  //       const reservationData = await login.findById(req.params.id);
  //       return commonFunction.successMessage(res, reservationData, {
  //         message: 'User Details',
  //       });
  //     } catch (e) {
  //       return commonFunction.errorMessage(res, e);
  //     }
  //   },
  //   deleteData: async (req, res) => {
  //     try {
  //       await login.findByIdAndDelete(req.params.id);
  //       return commonFunction.successMessage(res, {
  //         message: 'Delete data successfully',
  //       });
  //     } catch (e) {
  //       errorMessage(res, e);
  //     }
  //   },
  //   getDesignation: async (req, res, next) => {
  //     try {
  //       let data = await designation.find({});
  //       return commonFunction.successMessage(res, data);
  //     } catch (e) {
  //       return commonFunction.errorMessage(res, e);
  //     }
  //   },
  //   patchDesignation: async (req, res, next) => {
  //     try {
  //       let data = await designation.find({});
  //       console.log(data.permissions);
  //       await designation.findByIdAndUpdate(req.params.id, {
  //         permissions: req.body,
  //       });
  //       return commonFunction.successMessage(res, {
  //         message: 'Data updated successfully',
  //       });
  //     } catch (e) {
  //       return commonFunction.errorMessage(res, e);
  //     }
  //   },
  //   deleteDesignation: async (req, res) => {
  //     try {
  //       await designation.findByIdAndDelete(req.params.id);
  //       return commonFunction.successMessage(res, {
  //         message: 'Delete data successfully',
  //       });
  //     } catch (e) {
  //       return commonFunction.errorMessage(res, e);
  //     }
  //   },
};
