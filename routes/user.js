const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getProfile, updateProfile } = require('../controllers/usersControllers');

router.get('/me', getProfile);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
}), updateProfile);

module.exports = router;
