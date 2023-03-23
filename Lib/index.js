const handleResponseError = require('./handlingErrors');

const asycnWrapper = (promise) => promise
  .then((data) => ([undefined, data]))
  .catch((err) => ([err]));

module.exports = {
  asycnWrapper, handleResponseError,
};
