/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getProfile, updateProfile } = require('../controllers/usersControllers');

router.get('/me', getProfile);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(8),
  }),
}), updateProfile);

module.exports = router;
