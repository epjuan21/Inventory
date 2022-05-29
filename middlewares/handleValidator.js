const { validationResult } = require('express-validator');
const { handleHttpError } = require('../lib/handleHttpResponse');

const validateResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return handleHttpError(res, errors.array(), 400);
    }
    next();
}

module.exports = validateResults;
