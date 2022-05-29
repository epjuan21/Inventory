const { check } = require('express-validator');
const { userExist, roleExist, isAdmin } = require('../customUserValidations');
const { validateTokenJWT } = require('../handleJWTValidation');
const validateResults = require('../handleValidator');

// Obtener Usuario por Id - Público
const validatorGetUserById = [
    check('id', 'El id es requerido').not().isEmpty(),
    check('id', 'Id de Mongo Invalido').isMongoId(),
    check('id').custom(userExist),
    validateResults
]

// Actualizar Usuario - Usuarios Autenticados que sean Administradores
const validatorUpdateUser = [
    validateTokenJWT,
    isAdmin,
    check('id', 'Id de Mongo Invalido').isMongoId(),
    check('id').custom(userExist),
    check('role').custom(roleExist),
    validateResults
]

// Eliminar Usuario - Usuarios Autenticados que sean Administradores
const validatorDeleteUser = [
    validateTokenJWT,
    isAdmin,
    check('id', 'Id de Mongo Invalido').isMongoId(),
    check('id').custom(userExist),
    validateResults
]

module.exports = {
    validatorGetUserById,
    validatorUpdateUser,
    validatorDeleteUser
}
