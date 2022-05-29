const { check } = require("express-validator")
const { isAdmin } = require("../customUserValidations")
const { validateTokenJWT } = require("../handleJWTValidation")
const validateResults = require("../handleValidator")

// Creat Types - Usuarios Autenticados que sean Administradores
const validatorCreateType = [
    validateTokenJWT,
    isAdmin,
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('name', 'El nombre debe tener menos de 100 caracteres').isLength({ max: 100 }),
    validateResults
]

// Actualizar Types - Usuarios Autenticados que sean Administradores
const validatorUpdateType = [
    validateTokenJWT,
    isAdmin,
    check('id', 'Id de Mongo Invalido').isMongoId(),
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('name', 'El nombre debe tener menos de 100 caracteres').isLength({ max: 100 }),
    validateResults
]

// Eliminar Types - Usuarios Autenticados que sean Administradores
const validatorDeleteType = [
    validateTokenJWT,
    isAdmin,
    check('id', 'Id de Mongo Invalido').isMongoId(),
    validateResults
]

module.exports = {
    validatorCreateType,
    validatorUpdateType,
    validatorDeleteType
}
