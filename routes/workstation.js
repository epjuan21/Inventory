const { Router } = require("express");
const { createWorkstation, getWorkstations, deleteAllWorkstations } = require("../controllers/workstation");
const { validatorCreateWorkstation, validatorDeleteAllWorkstations } = require("../middlewares/validators/workstation");

const router = Router()

router.get('/', getWorkstations);                                           // Obtener todos los usuarios   Público
router.post('/', validatorCreateWorkstation, createWorkstation);            // Crear Workstation            Usuarios Autenticados que sean Administradores
router.delete('/', validatorDeleteAllWorkstations, deleteAllWorkstations);  // Eliminar todos los usuarios Usuarios Autenticados que sean Administradores

module.exports = router;
