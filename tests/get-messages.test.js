const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/create-user');
const Room = require('../models/room');
const Message = require('../models/message');
const mongoURI = require('../models/db');

describe('GET /api/rooms/:roomId/messages', () => {
  let jwtToken;
  let userId;
  let roomId;

  beforeAll(async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoose.connection.dropDatabase();

    const userResponse = await request(app)
      .post('/create-user')
      .send({
        username: 'testUser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password',
        confirmPassword: 'password',
      });
    userId = userResponse.body.userId;

    const loginResponse = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password' });
    jwtToken = loginResponse.body.token;

    const roomResponse = await request(app)
      .post(`/room/create/${userId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ name: 'Test Room', description: 'This is a test room' });
    roomId = roomResponse.body.room._id;

    await request(app)
    .post(`/${roomId}/send-message`)
    .set('Authorization', `Bearer ${jwtToken}`)
    .send({ content: 'Test message 1', userId });
  await request(app)
    .post(`/${roomId}/send-message`)
    .set('Authorization', `Bearer ${jwtToken}`)
    .send({ content: 'Test message 2', userId });
  });

  test('Should return status 200 and retrieve messages from a specific room', async () => {

    const response = await request(app).get(`/room/${roomId}/messages`);
    console.log(response.body)
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.messages).toHaveLength(2);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
