const { Router } = require('express');
const { getGroups, createGroup, updateGroup, deleteGroup } = require('../controllers/group');
const { validatorCreateGroup, validatorUpdateGroup, validatorDeleteGroup } = require('../middlewares/validators/group');

const router = Router();

router.get('/', getGroups);
router.post('/', validatorCreateGroup, createGroup);
router.put('/:id', validatorUpdateGroup, updateGroup);
router.delete('/:id', validatorDeleteGroup, deleteGroup);

module.exports = router;
