import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string().required().min(2).max(20).messages({
    'string.empty': `Name is  required `,
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      'string.empty': `Email is required `,
    }),
  password: Joi.string()
    .min(4)
    .max(10)
    .messages({
      'string.empty': `Password is required `,
    })
    .required(),
  phoneNumber: Joi.string()
    .required()
    .min(10)
    .max(10)
    .regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    .messages({
      'string.empty': `Phone number is required `,
      'string.pattern.base': `Invalid phone number format`,
    }),
});
