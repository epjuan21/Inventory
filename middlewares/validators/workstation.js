const { check, body } = require("express-validator")
const { formatDate } = require("../../lib/handleDates")
const { isAdmin } = require("../customUserValidations")
const { areaExist } = require("../customWorkstationValidations")
const { validateTokenJWT } = require("../handleJWTValidation")
const validateResults = require("../handleValidator")

// Crear Workstations - Usuarios Autenticados que sean Administradores
const validatorCreateWorkstation = [
    validateTokenJWT,
    isAdmin,
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('name', 'El nombre debe tener menos de 100 caracteres').isLength({ max: 100 }),
    check('description', 'La descripción es requerida').not().isEmpty(),
    check('description', 'La descripción debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('description', 'La descripción debe tener menos de 100 caracteres').isLength({ max: 100 }),
    check('brand', 'La marca es requerida').not().isEmpty(),
    check('brand', 'La marca debe tener más de 1 caracter').isLength({ min: 2 }),
    check('brand', 'La marca debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('brand').toUpperCase(),
    check('status', 'El status es requerido').not().isEmpty(),
    check('status').isIn(['DISPONIBLE', 'EN USO', 'DAÑADO', 'EN REPARACIÓN', 'EN PROCESO DE BAJA']).withMessage('El status debe estar entre los siguientes: DISPONIBLE, EN USO, DAÑADO, EN REPARACIÓN, EN PROCESO DE BAJA'),
    check('location', 'La ubicación es requerida').not().isEmpty(),
    check('location', 'La ubicación debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('location', 'La ubicación debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('location').toUpperCase(),
    check('area', 'La área es requerida').not().isEmpty(),
    check('area', 'Id de área inválido').isMongoId(),
    check('area').custom(areaExist),
    body('reference').default('SIN REFERENCIA'),
    check('reference', 'La referencia es requerida').not().isEmpty(),
    check('reference', 'La referencia debe tener mas de 4 caracteres').isLength({ min: 4 }),
    check('reference', 'La referencia debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('reference').toUpperCase(),
    body('serial').default('SIN SERIAL'),
    check('serial', 'El serial es requerido').not().isEmpty(),
    check('serial', 'El serial debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('serial', 'El serial debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('serial').toUpperCase(),
    check('plaque', 'La placa debe tener más de 3 caracteres').isLength({ min: 4 }),
    check('plaque', 'La placa debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('board').default('SIN INFORMACIÓN'),
    check('board', 'La placa debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('board', 'La placa debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('processor').default('SIN INFORMACIÓN'),
    check('processor', 'El procesador debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('processor', 'El procesador debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('ram').default('SIN INFORMACIÓN'),
    check('ram', 'La RAM es requerida').not().isEmpty(),
    check('ram', 'La memoria RAM debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('ram', 'La memoria RAM debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('ram').toUpperCase(),
    body('storage').default('SIN INFORMACIÓN'),
    check('storage', 'El almacenamiento es requerido').not().isEmpty(),
    check('storage', 'El almacenamiento debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('storage', 'El almacenamiento debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('storage').toUpperCase(),
    body('networkcardboard').default('SIN INFORMACIÓN'),
    check('networkcardboard', 'La tarjeta de red es requerida').not().isEmpty(),
    check('networkcardboard', 'La tarjeta de red debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('networkcardboard', 'La tarjeta de red debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('pcinetworkboard').default('NO TIENE'),
    check('pcinetworkboard', 'La placa de red es requerida').not().isEmpty(),
    check('pcinetworkboard', 'La placa de red debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('pcinetworkboard', 'La placa de red debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('pcinetworkboard').toUpperCase(),
    body('computername').default('SIN INFORMACIÓN'),
    check('computername', 'El nombre de computadora es requerido').not().isEmpty(),
    check('computername', 'El nombre de computadora debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('computername', 'El nombre de computadora debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('computername').toUpperCase(),
    body('fullnamecomputer').default('SIN INFORMACIÓN'),
    check('fullnamecomputer', 'El nombre completo de computadora es requerido').not().isEmpty(),
    check('fullnamecomputer', 'El nombre completo de computadora debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('fullnamecomputer', 'El nombre completo de computadora debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('computerdescription').default('SIN INFORMACIÓN'),
    check('computerdescription', 'La descripción de computadora es requerida').not().isEmpty(),
    check('computerdescription', 'La descripción de computadora debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('computerdescription', 'La descripción de computadora debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('computerdescription').toUpperCase(),
    body('domain').default('SIN INFORMACIÓN'),
    check('domain', 'El dominio es requerido').not().isEmpty(),
    check('domain', 'El dominio debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('domain', 'El dominio debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('localuser').default('SIN INFORMACIÓN'),
    check('localuser', 'El usuario local es requerido').not().isEmpty(),
    check('localuser', 'El usuario local debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('localuser', 'El usuario local debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('networkpoint').default('SIN INFORMACIÓN'),
    check('networkpoint', 'El punto de red es requerido').not().isEmpty(),
    check('networkpoint', 'El punto de red debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('networkpoint', 'El punto de red debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('networkpoint').toUpperCase(),
    body('patchpanel').default('SIN INFORMACIÓN'),
    check('patchpanel', 'El panel de patch es requerido').not().isEmpty(),
    check('patchpanel', 'El panel de patch debe tener más de 1 caracteres').isLength({ min: 1 }),
    check('patchpanel', 'El panel de patch debe tener menos de 2 caracteres').isLength({ max: 15}),
    body('patchpanel').toUpperCase(),
    body('xencokey').default(false),
    check('xencokey', 'La clave de xenco es requerida').not().isEmpty(),
    body('remoteuser').default('SIN INFORMACIÓN'),
    check('remoteuser', 'El usuario remoto es requerido').not().isEmpty(),
    check('remoteuser', 'El usuario remoto debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('remoteuser', 'El usuario remoto debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('dateofpurchase').default(formatDate(new Date(1970, 0, 1))),
    check('dateofpurchase', 'La fecha de compra es requerida').not().isEmpty(),
    check('dateofpurchase', 'La fecha de compra debe tener 10 caracteres').isLength({ min: 10 }),
    check('dateofpurchase', 'La fecha de compra debe tener 10 caracteres').isLength({ max: 10 }),
    body('purchasevalue').default(0),
    check('purchasevalue', 'El valor de compra es requerido').not().isEmpty(),
    check('purchasevalue', 'El valor debe ser numerico').isNumeric(),
    body('addressanydesk').default('SIN INFORMACIÓN'),
    check('addressanydesk', 'La dirección de AnyDesk es requerida').not().isEmpty(),
    check('addressanydesk', 'La dirección de AnyDesk debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('addressanydesk', 'La dirección de AnyDesk debe tener menos de 100 caracteres').isLength({ max: 100 }),
    body('anydeskpassword').default('SIN INFORMACIÓN'),
    check('anydeskpassword', 'La contraseña de AnyDesk es requerida').not().isEmpty(),
    check('anydeskpassword', 'La contraseña de AnyDesk debe tener más de 4 caracteres').isLength({ min: 4 }),
    check('anydeskpassword', 'La contraseña de AnyDesk debe tener menos de 100 caracteres').isLength({ max: 100 }),
    validateResults
]

const validatorDeleteAllWorkstations = [
    validateTokenJWT,
    isAdmin,
    validateResults
]

module.exports = {
    validatorCreateWorkstation,
    validatorDeleteAllWorkstations
}
