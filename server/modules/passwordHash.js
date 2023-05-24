const user = require('../model/login');

exports.passwordHashing = async (password) => {
  const salt = await user.generateSalt();
  let newPassword = await user.hashPassword(password, salt);
  return { salt, newPassword };
};
