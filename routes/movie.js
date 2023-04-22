const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/moviesControllers');
const { ValidateMovie, ValidateMovieDelete } = require('../midldlewares/validation');

router.get('/', getMovies);
router.post('/', ValidateMovie, createMovie);
router.delete('/:movieId', ValidateMovieDelete, deleteMovie);

module.exports = router;
