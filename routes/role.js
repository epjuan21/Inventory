const { Router } = require('express');
const { getRoles, createRole } = require('../controllers/role');
const { validatorCreateRole } = require('../middlewares/validators/role');

const router = Router();

router.get('/', getRoles)
router.post('/', validatorCreateRole, createRole)

module.exports = router;
