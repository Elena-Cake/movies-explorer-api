const mongoose = require('mongoose');
const { CodeStatus } = require('../constans/CodeStatus');
const ForbiddenError = require('../errors/Forbidden');
const NoValidateError = require('../errors/NoValidate');
const UnderfinedError = require('../errors/Underfined');
const Movies = require('../models/movie');

const createMoviesDTO = (movie) => (
  {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: movie.image,
    trailerLink: movie.trailerLink,
    thumbnail: movie.thumbnail,
    owner: movie.owner,
    coumovieId: movie._id,
    movieId: movie.movieId,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
  }
);

// GET http://localhost:3001/movies/
const getMovies = (req, res, next) => {
  Movies
    .find({})
    .populate(['owner'])
    .then((movies) => {
      res.status(CodeStatus.OK.CODE)
        .send(
          movies.map((movie) => createMoviesDTO(movie)),
        );
    })
    .catch(next);
};

// POST http://localhost:3001/movies/
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    coumovieId,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movies
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      coumovieId,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    })
    .then((movie) => {
      res.status(CodeStatus.CREATED.CODE)
        .send(createMoviesDTO(movie));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new NoValidateError());
        return;
      }
      next(err);
    });
};

// DELETE http://localhost:3001/movies/movieId
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  console.log(movieId);
  Movies
    .findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new UnderfinedError('Фимльм не найден');
      }
      if (userId !== movie.owner.valueOf()) {
        throw new ForbiddenError();
      }
      return movie.remove()
        .then(() => res.send({ movie }));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new NoValidateError());
        return;
      }
      next(err);
    });
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
