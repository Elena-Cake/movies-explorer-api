const router = require('express').Router();
const { createUser, login } = require('../controllers/authControllers');
const { ValidateSignUp, ValidateSignIn } = require('../midldlewares/validation');

router.post('/signup', ValidateSignUp, createUser);
router.post('/signin', ValidateSignIn, login);

module.exports = router;
