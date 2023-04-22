const { CodeStatus } = require('../constans/CodeStatus');

class ConflictError extends Error {
  constructor() {
    super();
    this.message = CodeStatus.CONFLICT.MESSAGE;
    this.name = 'ConflictError';
    this.statusCode = CodeStatus.CONFLICT.CODE;
  }
}

module.exports = ConflictError;
