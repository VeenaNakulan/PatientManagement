import Joi from 'joi';

export const schema = Joi.object({
  date: Joi.string().required().min(2).max(20).messages({
    'string.empty': `Date is  required `,
  }),
  hospitalId: Joi.string().required().messages({
    'string.empty': `Hospital is required `,
  }),
  departmentId: Joi.string().required().messages({
    'string.empty': `Department is required `,
  }),
  doctorId: Joi.string().required().messages({
    'string.empty': 'Doctor is required',
  }),
  time: Joi.string().required().messages({
    'string.empty': `Time is  required `,
  }),
});
