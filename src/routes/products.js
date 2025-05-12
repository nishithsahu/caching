const express = require('express');
const router = express.Router();
const cache = require('../middleware/cache');
const products = require('../data/products.json');

router.get('/', cache, (req, res) => {
  res.json(products);
});

module.exports = router;
