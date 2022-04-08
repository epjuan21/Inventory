const express = require('express');
const authRouter = require('./auth.router');

function routerApi(app) {

  const router = express.Router();

  app.use('/api/v1', router);

  router.use('/auth', authRouter);
}

module.exports = routerApi;
