// utils/responseHandler.js

// Success response handler
const successResponse = (res, message, data = {}, statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };
  
  // Error response handler
  const errorResponse = (res, message, error = {}, statusCode = 500) => {
    res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse,
  };
  