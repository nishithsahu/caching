const request = require('supertest');
const app = require('../src/app');

describe('API Rate Limiting and Caching', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Silence logs
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  it('should return 200 for the initial request', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return cached response within 30 seconds', async () => {
    const res1 = await request(app).get('/api/products');
    const res2 = await request(app).get('/api/products');
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toEqual(res1.body); // Should be identical (cached)
  });

  it('should block after 10 rapid requests (rate limit)', async () => {
    let res;
    for (let i = 0; i < 10; i++) {
      res = await request(app).get('/api/products');
    }
    res = await request(app).get('/api/products'); // 11th request
    expect(res.statusCode).toBe(429);
    expect(res.text).toContain('Too many requests');
  });

  it('should log each request with timestamp and IP', async () => {
    await request(app).get('/api/products');
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/\[.*\] - ::ffff:\d+\.\d+\.\d+\.\d+ - GET \/api\/products/)
    );
  });
});
