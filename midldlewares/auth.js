const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const UnauthorizedError = require('../errors/Unauthorized');
const { CodeStatus } = require('../constans/CodeStatus');

// get
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnauthorizedError(CodeStatus.UNAUTHORIZED.MESSAGE);
  }

  const jwt = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(CodeStatus.UNAUTHORIZED.MESSAGE));
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
