const { CodeStatus } = require('../constans/CodeStatus');

class UnauthorizedError extends Error {
  constructor() {
    super();
    this.message = CodeStatus.UNAUTHORIZED.MESSAGE;
    this.name = 'AnauthorizedError';
    this.statusCode = CodeStatus.UNAUTHORIZED.CODE;
  }
}

module.exports = UnauthorizedError;
