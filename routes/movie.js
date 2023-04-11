/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getMovies, createMovie, deleteMovie } = require('../controllers/moviesControllers');

const patternUrl = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?/i;

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string(),
    director: Joi.string(),
    duration: Joi.number(),
    year: Joi.number(),
    movieId: Joi.number(),
    description: Joi.string(),
    nameRU: Joi.string(),
    nameEN: Joi.string(),
    image: Joi.string().required().pattern(patternUrl),
    trailerLink: Joi.string().required().pattern(patternUrl),
    thumbnail: Joi.string().required().pattern(patternUrl),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
