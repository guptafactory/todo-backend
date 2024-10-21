function errorMiddleware(err, req, res, next) {
  // "req, res, next" is necessary (don't remove from arguments)

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}

export default errorMiddleware;
