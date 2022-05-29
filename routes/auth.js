const { Router } = require('express');
const router = Router();
const { login, register } = require('../controllers/auth');
const { validatorRegisterUser, validatorLoginUser } = require('../middlewares/validators/auth');

router.post('/login', validatorLoginUser, login);
router.post('/register', validatorRegisterUser, register);

module.exports = router
