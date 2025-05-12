require('dotenv').config();
const express = require('express');
const rateLimiter = require('./middleware/rateLimiter');
const logger = require('./utils/logger');

const app = express();

// Middleware order matters
app.use(logger);
app.use(rateLimiter);

app.use('/api/products', require('./routes/products'));

module.exports = app;

// Run server only if not in test mode
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
