const { CodeStatus } = require('../constans/CodeStatus');

class UnderfinedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnderfinedError';
    this.statusCode = CodeStatus.UNDERFINED.CODE;
  }
}

module.exports = UnderfinedError;
