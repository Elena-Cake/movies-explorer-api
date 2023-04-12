const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/Unauthorized');
const { CodeStatus } = require('../constans/CodeStatus');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, CodeStatus.NO_VALIDATE.MAIL_MESSAGE],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (user) {
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (matched) {
              return user;
            }
            return Promise.reject(new UnauthorizedError());
          });
      }
      return Promise.reject(new UnauthorizedError());
    });
};

module.exports = mongoose.model('user', userSchema);
