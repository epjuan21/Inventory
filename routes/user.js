const { Router } = require('express');
const { getUserById, getUsers, updateUser, deleteUser } = require('../controllers/user');
const { validatorGetUserById, validatorUpdateUser, validatorDeleteUser } = require('../middlewares/validators/user');

const router = Router();

router.get('/', getUsers);                                  // Obtener todos los usuarios   Público
router.get('/:id', validatorGetUserById, getUserById);      // Obtener Usuario por Id       Público
router.put('/:id', validatorUpdateUser, updateUser);        // Actualizar Usuario           Usuarios Autenticados y Administradores
router.delete('/:id', validatorDeleteUser, deleteUser);     // Eliminar Usuarios            Usuarios Autenticados y Administradores

module.exports = router;
