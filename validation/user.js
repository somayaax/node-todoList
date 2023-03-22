/* eslint-disable linebreak-style */
const Joi = require('joi');

const signUp = {
    body: Joi.object().required().keys({
        userName: Joi.string().min(5).required(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')).message("password must be at least 5 chars, at most 30"),
        quote: Joi.string().required(),
    }),
};
const signIn = {
    body: Joi.object().required().keys({
        userName: Joi.string().min(5).required(),
        password: Joi.string().required(),
    }),
};

const id = {
    params: Joi.object().required().keys({
      id: Joi.string().length(24).required(),
    }),
  };

  const update ={
    body: Joi.object().required().keys({
        userName: Joi.string().min(8),
        firstName: Joi.string().min(3).max(15),
        lastName: Joi.string().min(3).max(15),
        DOB: Joi.date(),
    }),
  }
module.exports = {
    signUp,
    signIn,
    id,
    update
};
