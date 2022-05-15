const { Router } = require('express');
const { getUserById, getUsers, updateUser, deleteUser } = require('../controllers/user');

const router = Router();

router.get('/:id', getUserById);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
