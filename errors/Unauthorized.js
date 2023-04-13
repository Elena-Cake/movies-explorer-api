const { CodeStatus } = require('../constans/CodeStatus');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AnauthorizedError';
    this.statusCode = CodeStatus.UNAUTHORIZED.CODE;
  }
}

module.exports = UnauthorizedError;
