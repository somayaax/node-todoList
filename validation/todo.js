/* eslint-disable linebreak-style */
const Joi = require('joi');

const id = {
  params: Joi.object().required().keys({
    id: Joi.string().length(24).required(),
  }),
};

module.exports = {
  id,
};
