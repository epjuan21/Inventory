exports.success = function(req, res, message, status) {
  let statusCode = status || 200;
  let statusMessage = message || 'OK';

  res.status(statusCode).send({
    error: false,
    status: statusCode,
    body: statusMessage,
  })
}

exports.error = function (req, res, message, status) {
  let statusCode = status || 500;
  let statusMessage = message || 'Internal Server Error';

  res.status(statusCode).send({
    error: true,
    status: statusCode,
    message: statusMessage,
  })
}