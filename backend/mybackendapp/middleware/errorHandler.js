const ErrorHandler = require("../utils/ErrorHandler");

const errorHandler = (err, req, res, next) => {
  // If the error is an instance of ErrorHandler, use its status code and message
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Something went wrong",
      statusCode: err.statusCode || 500
    });
  }

  // If it's not a custom error, return a generic server error
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    statusCode: err.statusCode || 500
  });
};

module.exports = errorHandler;