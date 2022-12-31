const { Router } = require('express');
const router = Router();
const { login, register, confirm, resetPassword, verifyToken, renewPassword, getProfile } = require('../controllers/auth');
const { validateTokenJWT } = require('../middlewares/handleJWTValidation');
const { validatorRegisterUser, validatorLoginUser } = require('../middlewares/validators/auth');

router.post('/login', validatorLoginUser, login);
router.post('/register', validatorRegisterUser, register);
router.get('/confirm/:token', confirm)
router.post('/password/reset', resetPassword)
router.get('/password/:token', verifyToken)
router.post('/password/renewPassword/:token', renewPassword)
router.get('/profile', validateTokenJWT, getProfile)

module.exports = router
