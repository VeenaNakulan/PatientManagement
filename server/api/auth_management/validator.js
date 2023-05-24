const Joi = require('joi');
const signUpSchema = require('../../model/signup');
const { errorMessage } = require('../../helpers/commonFunctions');

const validationSchema = async (req, res, next) => {
  const signUpSchema = Joi.object({
    name: Joi.string().alphanum().min(2).max(20),
    email: Joi.string().email(),
    phoneNumber: Joi.string(),
    password: Joi.string()
      .min(6)
      .max(20)
      .pattern(
        new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
        )
      ),
  });

  try {
    req.body = await signUpSchema.validateAsync(req.body);
    next();
  } catch (err) {
    return errorMessage(err);
  }
};

module.exports = { validationSchema };
