const mongoose = require('mongoose');
const AppError = require('./appError');

const handleValidationError = (err) => new AppError(`${Object.keys(err.errors).join(' ')} is not valid `, 422);

const handleDuplicteError = (err) => new AppError(` Value of field ${Object.keys(err.keyValue)[0]} is Duplicated please choose another one`, 422);

/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars
const handleResponseError = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) { err = handleValidationError(err); }
  if (err.code === 11000) { err = handleDuplicteError(err); }
  err.status = err.status || 'failed';
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({ message: err.message, status: err.status });
};

module.exports = handleResponseError;
