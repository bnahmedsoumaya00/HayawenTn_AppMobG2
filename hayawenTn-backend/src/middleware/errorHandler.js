// src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('❌ ERROR:', err.message);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erreur serveur interne';

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;