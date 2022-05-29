const { check } = require("express-validator");
const { isAdmin } = require("../customUserValidations");
const { validateTokenJWT } = require("../handleJWTValidation");
const validateResults = require("../handleValidator");

// Crear Areas - Usuarios Autenticados que sean Administradores
const validatorCreateArea = [
    validateTokenJWT,
    isAdmin,
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('name', 'El nombre debe tener menos de 100 caracteres').isLength({ max: 100 }),
    validateResults
]

// Actualizar Areas - Usuarios Autenticados que sean Administradores
const validatorUpdateArea = [
    validateTokenJWT,
    isAdmin,
    check('id', 'Id de Mongo Invalido').isMongoId(),
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('name', 'El nombre debe tener menos de 100 caracteres').isLength({ max: 100 }),
    validateResults
]

// Eliminar Areas - Usuarios Autenticados que sean Administradores
const validatorDeleteArea = [
    validateTokenJWT,
    isAdmin,
    check('id', 'Id de Mongo Invalido').isMongoId(),
    validateResults
]

module.exports = {
    validatorCreateArea,
    validatorUpdateArea,
    validatorDeleteArea
}
