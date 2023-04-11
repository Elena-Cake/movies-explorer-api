const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { CodeStatus } = require('../constans/CodeStatus');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const NoValidateError = require('../errors/NoValidate');
const ConflictError = require('../errors/Conflict');

const createUserDTO = (user) => (
  {
    name: user.name,
    email: user.email,
    _id: user._id,
  }
);

// POST http://localhost:3001/signup
const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User
        .create({
          name,
          email,
          password: hash,
        })
        .then((user) => res.status(CodeStatus.CREATED.CODE)
          .send(createUserDTO(user)))
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            next(new NoValidateError());
            return;
          }
          if (err.code === 11000) {
            next(new ConflictError());
            return;
          }
          next(err);
        });
    });
};

// POST http://localhost:3001/login
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token, message: 'Пользователь зарегестрирован' });
    })
    .catch(next);
};

module.exports = {
  createUser, login,
};
