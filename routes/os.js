const { Router } = require('express');
const { getOs, createOs, deleteOs } = require('../controllers/os');
const { validatorCreateOs, validatorDeleteOs } = require('../middlewares/validators/os');

const router = Router();

router.get('/', getOs);
router.post('/', validatorCreateOs, createOs);
router.delete('/:id', validatorDeleteOs, deleteOs);

module.exports = router;
