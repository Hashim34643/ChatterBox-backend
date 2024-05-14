const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Room = require("../models/room");
const User = require("../models/create-user");
const Message = require("../models/message");
const mongoURI = require("../models/db");

describe("Message API Endpoints", () => {
  let jwtToken;
  let userId;
  let roomId;

  beforeAll(async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoose.connection.dropDatabase();

    const userResponse = await request(app)
      .post("/create-user")
      .send({
        username: "testUser",
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        password: "password",
        confirmPassword: "password"
      });
    userId = userResponse.body.userId;

    const loginResponse = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "password" });
    jwtToken = loginResponse.body.token;

    const roomResponse = await request(app)
      .post(`/room/create/${userId}`)
      .set("Authorization", `Bearer ${jwtToken}`)
      .send({
        name: "Test Room",
        description: "This is a test room"
      });
    roomId = roomResponse.body.room._id;
  });

  test("Should send a message to the room with status 201", async () => {
    const messageData = {
      content: "Hello, this is a test message",
      userId: userId
    };

    const response = await request(app)
      .post(`/${roomId}/send-message`)
      .set("Authorization", `Bearer ${jwtToken}`)
      .send(messageData);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Message sent successfully");
    expect(response.body.messageData).toHaveProperty("content", messageData.content);
    expect(response.body.messageData).toHaveProperty("roomId", roomId);
    expect(response.body.messageData).toHaveProperty("userId", userId);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
