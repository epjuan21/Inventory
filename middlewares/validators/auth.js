const { check } = require('express-validator');
const { emailExist, emailNotExist, isActive, isPasswordCorrect, roleExist } = require('../customUserValidations');
const validateResults = require('../handleValidator');

const validatorRegisterUser = [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener más de 10 caracteres').isLength({ min: 10 }),
    check('name', 'El nombre debe tener menos de 100 caracteres').isLength({ max: 100 }),
    check('email', 'El Email es requerido').not().isEmpty(),
    check('email', 'El Email debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El Email debe tener menos de 100 caracteres').isLength({ max: 100 }),
    check('email', 'Email Invalido').isEmail(),
    check('email').custom(emailExist),
    check('password', 'El Password es requerido').not().isEmpty(),
    check('password', 'El Password debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('role', 'El Rol es requerido').not().isEmpty(),
    check('role').custom(roleExist),
    validateResults
]

const validatorLoginUser = [
    check('email', 'El Email es requerido').not().isEmpty(),
    check('email', 'El Email debe tener más de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El Email debe tener menos de 100 caracteres').isLength({ max: 100 }),
    check('email', 'Email Invalido').isEmail(),
    check('email', 'El Email no existe').custom(emailNotExist),
    check('password', 'El Password es requerido').not().isEmpty(),
    isActive,
    isPasswordCorrect,
    validateResults
]

module.exports = {
    validatorRegisterUser,
    validatorLoginUser
}
