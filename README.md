# 📦 API Rate Limiting & Caching - Node.js + Redis

This is a simple Node.js application demonstrating **API rate limiting per IP** and **response caching** using Redis.

## 🚀 Features

- ✅ Public endpoint: `/api/products`
- ✅ Rate Limiting: Max 10 requests per minute per IP
- ✅ Response Caching: Product response cached for 30 seconds
- ✅ Proper status codes and error messages
- ✅ Logging: Logs each request with timestamp and IP

## 📁 Project Structure

caching/
├── src/
│   ├── routes/
│   │   └── products.js
│   ├── middlewares/
│   │   ├── rateLimiter.js
│   │   └── cache.js
│   ├── utils/
│   │   └── logger.js
│   ├── data/
│   │   └── products.json
│   └── app.js
├── .env
├── Dockerfile
├── package.json
├── README.md
└── tests/
    └── middleware.test.js

## ⚙️ Setup & Run Instructions

### 1. Clone and Install Dependencies

git clone <https://github.com/nishithsahu/caching.git>
cd api-rate-limit-caching
npm install

### 2. Run Redis on docker

docker run -d --name redis -p 6379:6379 redis

### 3. Add .env file as below

PORT=3000
CACHE_TTL=30
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW_MS=60000
REDIS_URL=redis://localhost:6379

### 4. Run the server

npm run dev

### 4. Test the Caching

npm test
