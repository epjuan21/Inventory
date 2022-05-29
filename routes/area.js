const { Router } = require('express');
const { getAreas, createArea, updateArea, deleteArea } = require('../controllers/area');
const { validatorCreateArea, validatorUpdateArea, validatorDeleteArea } = require('../middlewares/validators/area');
const router = Router();

router.get('/', getAreas);                              // Obtener todos los areas   Público
router.post('/', validatorCreateArea, createArea);      // Crear Area                Usuarios Autenticados y Administradores
router.put('/:id', validatorUpdateArea, updateArea);    // Actualizar Area           Usuarios Autenticados y Administradores
router.delete('/:id', validatorDeleteArea, deleteArea); // Eliminar Area             Usuarios Autenticados y Administradores

module.exports = router;
