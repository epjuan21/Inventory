const { Router } = require('express');
const { getOs, createOs } = require('../controllers/os');

const router = Router();

router.get('/', getOs);
router.post('/', createOs);

module.exports = router;
