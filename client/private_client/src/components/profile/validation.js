import Joi from 'joi';

export const profileSchema = Joi.object({
  name: Joi.string().required().min(2).max(20).messages({
    'string.empty': `Name is  required `,
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      'string.empty': `Email is required `,
    }),
  phoneNumber: Joi.string()
    .required()
    .min(10)
    .max(10)
    .regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    .messages({
      'string.empty': `Phone number is required `,
      'string.pattern.base': `Invalid phone number format`,
    }),
  aadharNo: Joi.string()
    .pattern(/^\d{4}\s\d{4}\s\d{4}$/)
    .required()
    .messages({
      'string.empty': 'Aadhaar number is required',
      'string.pattern.base': 'Invalid Aadhaar number format',
    }),
  dob: Joi.string().required().messages({
    'string.empty': `Date  is  required `,
  }),
  address: Joi.string().required().messages({
    'string.empty': `Address  is  required `,
  }),
  country: Joi.string().required().messages({
    'string.empty': `Country  is  required `,
  }),
  state: Joi.string().required().messages({
    'string.empty': `State  is  required `,
  }),
  pinCode: Joi.string()
    .pattern(/^\d{6}$/)
    .required()
    .messages({
      'string.empty': `Pincode is  required `,
    }),
});

export const medicalSchema = Joi.object({
  blood: Joi.string().required().min(2).max(20).messages({
    'string.empty': `Blood is  required `,
  }),
  height: Joi.string().required().messages({
    'string.empty': `Height is required `,
  }),
  weight: Joi.string().required().messages({
    'string.empty': `Weight is required `,
  }),
  gender: Joi.string().required().messages({
    'string.empty': 'Gender is required',
  }),
  diseaseName: Joi.string().required().messages({
    'string.empty': `Disease is  required `,
  }),
  startedDate: Joi.string().required().messages({
    'string.empty': `Date is  required `,
  }),
  remarks: Joi.string().required().messages({
    'string.empty': `Remarks is  required `,
  }),
});
