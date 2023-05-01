const { celebrate, Joi } = require('celebrate');
const { PATTERN_URL, PATTERN_EMAIL } = require('../constans/CodeStatus');

module.exports.ValidateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(PATTERN_EMAIL),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.ValidateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(PATTERN_EMAIL),
    password: Joi.string().required(),
  }),
});

module.exports.ValidateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().required().pattern(PATTERN_URL),
    trailerLink: Joi.string().required().pattern(PATTERN_URL),
    thumbnail: Joi.string().required().pattern(PATTERN_URL),
    movieId: Joi.number().required(),
  }),
});

module.exports.ValidateMovieDelete = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});

module.exports.ValidateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().pattern(PATTERN_EMAIL).required(),
  }),
});
