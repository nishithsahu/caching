const Redis = require('ioredis');
const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const cache = (req, res, next) => {
  const key = req.originalUrl;

  redisClient.get(key, (err, data) => {
    if (err) return next(err);

    if (data) {
      return res.status(200).json(JSON.parse(data));
    }

    res.sendResponse = res.json;
    res.json = (body) => {
      redisClient.setex(
        key,
        parseInt(process.env.CACHE_TTL || 30),
        JSON.stringify(body)
      );
      res.sendResponse(body);
    };

    next();
  });
};

module.exports = cache;
