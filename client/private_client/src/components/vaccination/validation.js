import Joi from 'joi';

export const schema = Joi.object({
  vaccineId: Joi.string().required().messages({
    'string.empty': `Vaccine is  required `,
  }),
  hospitalId: Joi.string().required().messages({
    'string.empty': `Hospital is required `,
  }),
  date: Joi.string().required().messages({
    'string.empty': `Date is  required `,
  }),
});
