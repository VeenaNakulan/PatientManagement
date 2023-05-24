const {
  successMessage,
  errorMessage,
} = require('../../helpers/commonFunctions');
const login = require('../../model/login');

module.exports = {
  changePassword: async (req, res, next) => {
    try {
      let { currentPassword, newPassword } = req.body;
      // Extract the JWT token from the authorization header
      const user = await login.findById(req.user.id);
      // Compare the current password with the stored password
      const isPasswordValid = await login.verifyPassword(
        currentPassword,
        user.password,
        user.salt
      );
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid password.' });
      }
      // Encrypt the new password
      const newPasswordHash = await login.hashPassword(newPassword, user.salt);
      // Update the password in the database
      user.password = newPasswordHash;
      await user.save();
      return successMessage(res, 'Password changed succesfully');
    } catch (e) {
      errorMessage(res, e);
    }
  },
};
