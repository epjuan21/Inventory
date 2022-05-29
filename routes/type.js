const { Router } = require('express');
const { getTypes, createType, updateType, deleteType } = require("../controllers/type");
const { validatorCreateType, validatorUpdateType, validatorDeleteType } = require('../middlewares/validators/type');
const router = Router();

router.get('/', getTypes);                               // Obtener todos los types   Público
router.post('/', validatorCreateType, createType);       // Crear Type                Usuarios Autenticados y Administradores
router.put('/:id', validatorUpdateType, updateType);     // Actualizar Type           Usuarios Autenticados y Administradores
router.delete('/:id', validatorDeleteType, deleteType);  // Eliminar Type             Usuarios Autenticados y Administradores

module.exports = router;
