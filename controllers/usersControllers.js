const mongoose = require('mongoose');
const { CodeStatus } = require('../constans/CodeStatus');
const User = require('../models/user');
const UnderfinedError = require('../errors/Underfined');
const NoValidateError = require('../errors/NoValidate');

const createUserDTO = (user) => (
  {
    name: user.name,
    email: user.email,
    _id: user._id,
  }
);

// GET http://localhost:3001/users/me
const getProfile = (req, res, next) => {
  const userId = req.user._id;
  User
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new UnderfinedError(CodeStatus.UNDERFINED.USER_MESSAGE);
      }
      res.status(CodeStatus.OK.CODE)
        .send(createUserDTO(user));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new NoValidateError());
        return;
      }
      next(err);
    });
};

// PATCH http://localhost:3000/users/me/
const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User
    .findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new UnderfinedError(CodeStatus.UNDERFINED.USER_MESSAGE);
      }
      res.status(CodeStatus.OK.CODE)
        .send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new NoValidateError());
        return;
      }
      next(err);
    });
};

module.exports = {
  updateProfile, getProfile,
};
