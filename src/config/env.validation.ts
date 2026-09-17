import Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),

  JWT_SECRET: Joi.string().required().min(32),
  JWT_EXPIRES_IN: Joi.number().default(604800),
  CORS_ORIGIN: Joi.string().required(),

  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
});
