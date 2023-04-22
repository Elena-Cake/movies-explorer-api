const router = require('express').Router();
const { getProfile, updateProfile } = require('../controllers/usersControllers');
const { ValidateUserUpdate } = require('../midldlewares/validation');

router.get('/me', getProfile);

router.patch('/me', ValidateUserUpdate, updateProfile);

module.exports = router;
