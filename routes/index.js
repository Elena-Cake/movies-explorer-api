const router = require('express').Router();
const userRoutes = require('./user');
const movieRoutes = require('./movie');
const authRoutes = require('./auth');
const { auth } = require('../midldlewares/auth');

const UnderfinedError = require('../errors/Underfined');

router.post('/signup', authRoutes);
router.post('/signin', authRoutes);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use(
  (req, res, next) => {
    next(new UnderfinedError('Обращение по необъявленному пути'));
  },
);

module.exports = router;
