const { check, body } = require("express-validator");
const { osExist, osDeleted, serialExist } = require("../customOsValidations");
const { isAdmin } = require("../customUserValidations");
const { validateTokenJWT } = require("../handleJWTValidation");
const validateResults = require("../handleValidator");

// Crear Sistema Operativo - Usuarios Autenticados que sean Administradores
const validatorCreateOs = [
    validateTokenJWT,
    isAdmin,
    check('licence', 'La licencia es requerida').not().isEmpty(),
    check('licence', 'La licencia debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('licence', 'La licencia debe tener menos de 100 caracteres').isLength({ max: 100 }),
    check('version', 'La versión es requerida').not().isEmpty(),
    check('version', 'La versión debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('version', 'La versión debe tener menos de 100 caracteres').isLength({ max: 100 }),
    check('barcode', 'El código de barras es requerido').not().isEmpty(),
    check('barcode', 'El código de barras debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('barcode', 'El código de barras debe tener menos de 100 caracteres').isLength({ max: 100 }),
    check('serial', 'El número de serie es requerido').not().isEmpty(),
    check('serial', 'El número de serie debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('serial', 'El número de serie debe tener menos de 100 caracteres').isLength({ max: 100 }),
    check('serial').custom(serialExist),
    check('workstation_id', 'El id de la workstation es requerido').not().isEmpty(),
    check('workstation_id', 'Id de Mongo Invalido').isMongoId(),
    check('availability', 'La disponibilidad es requerida').not().isEmpty(),
    body('availability').default(false),
    check('consecutive', 'El consecutivo es requerido').not().isEmpty(),
    check('consecutive', 'El valor debe ser numerico').isNumeric(),
    validateResults
]

// Eliminar Sistema Operativo - Usuarios Autenticados que sean Administradores
const validatorDeleteOs = [
    validateTokenJWT,
    isAdmin,
    check('id', 'Id de Mongo Invalido').isMongoId(),
    check('id').custom(osExist),
    check('id').custom(osDeleted),
    validateResults
]

module.exports = {
    validatorCreateOs,
    validatorDeleteOs
}
