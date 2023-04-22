const { CodeStatus } = require('../constans/CodeStatus');

class NoValidateError extends Error {
  constructor() {
    super();
    this.message = CodeStatus.NO_VALIDATE.MESSAGE;
    this.name = 'NoValidateError';
    this.statusCode = CodeStatus.NO_VALIDATE.CODE;
  }
}

module.exports = NoValidateError;
