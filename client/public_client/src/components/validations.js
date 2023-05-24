import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': `Name is  required `,
  }),
  email: Joi.string().required().messages({
    'string.empty': `Email is required `,
  }),
  message: Joi.string().required().messages({
    'string.empty': `Message is  required `,
  }),
});
