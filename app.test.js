const request = require('supertest');
const app = require('./app');

describe('Authentication Tests', () => {
  test('Successful Login', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'user1', password: 'Password123' });
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Login required');
  });

  test('Failed Login', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'user1', password: 'WrongPassword' });
    expect(response.statusCode).toBe(401);
    expect(response.text).toBe('Authentication failed');
  });

  test('Logout', async () => {
    const response = await request(app).post('/logout');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Logout successful');
  });
});
