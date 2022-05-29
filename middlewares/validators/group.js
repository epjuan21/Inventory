const { check } = require("express-validator")
const { isAdmin } = require("../customUserValidations")
const { validateTokenJWT } = require("../handleJWTValidation")
const validateResults = require("../handleValidator")

// Crear Grupos - Usuarios Autenticados que sean Administradores
const validatorCreateGroup = [
    validateTokenJWT,
    isAdmin,
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('name', 'El nombre debe tener menos de 100 caracteres').isLength({ max: 100 }),
    validateResults
]

// Actualizar Grupos - Usuarios Autenticados que sean Administradores
const validatorUpdateGroup = [
    validateTokenJWT,
    isAdmin,
    check('id', 'Id de Mongo Invalido').isMongoId(),
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('name', 'El nombre debe tener menos de 100 caracteres').isLength({ max: 100 }),
    validateResults
]

// Eliminar Grupos - Usuarios Autenticados que sean Administradores
const validatorDeleteGroup = [
    validateTokenJWT,
    isAdmin,
    check('id', 'Id de Mongo Invalido').isMongoId(),
    validateResults
]

module.exports = {
    validatorCreateGroup,
    validatorUpdateGroup,
    validatorDeleteGroup
}
