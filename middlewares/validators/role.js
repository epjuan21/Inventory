const { check } = require("express-validator")
const { isAdmin } = require("../customUserValidations")
const { validateTokenJWT } = require("../handleJWTValidation")
const validateResults = require("../handleValidator")

// Crear Role - Usuarios Autenticados que sean Administradores
const validatorCreateRole = [
    validateTokenJWT,
    isAdmin,
    check('role', 'El rol es requerido').not().isEmpty(),
    check('role', 'El rol debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('role', 'El rol debe tener menos de 100 caracteres').isLength({ max: 100 }),
    validateResults
]

module.exports = {
    validatorCreateRole
}
