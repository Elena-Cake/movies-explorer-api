const { CodeStatus } = require('../constans/CodeStatus');

class ForbiddenError extends Error {
  constructor() {
    super();
    this.message = CodeStatus.FORBIDDEN.MESSAGE;
    this.name = 'ForbiddenError';
    this.statusCode = CodeStatus.FORBIDDEN.CODE;
  }
}

module.exports = ForbiddenError;
