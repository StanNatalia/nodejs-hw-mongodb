import Joi from 'joi';

import { typeList } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name required',
    'string.base': 'Name must be a string',
  }),
  phoneNumber: Joi.string().required().messages({
    'any.required': 'Phonenumber required',
    'string.base': 'Phonenumber must be a string',
  }),
  email: Joi.string().messages({
    'string.base': 'Email must be a string',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'IsFavourite must be true or false',
  }),
  contactType: Joi.string()
    .valid(...typeList)
    .required()
    .messages({
      'any.required': 'ContactType required',
      'string.base': 'ContactType be a string',
    }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  phoneNumber: Joi.string(),
  email: Joi.string(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
});
