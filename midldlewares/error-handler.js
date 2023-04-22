const { CodeStatus } = require('../constans/CodeStatus');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500
    ? CodeStatus.INTERNAL.MESSAGE
    : err.message;

  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
