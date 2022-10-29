import Joi from 'joi';

const notFilled = '400|All fields must be filled';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': notFilled,
    'string.empty': notFilled,
    'string.email': '401|Incorrect email or password',
  }),
  password: Joi.string().min(6).required().empty()
    .messages({
      'any.required': notFilled,
      'string.empty': notFilled,
      'string.min': '401|Incorrect email or password',
    }),
});

export default loginSchema;
