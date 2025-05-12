// utils/logger.js
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] - ${req.ip} - ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = logger;
