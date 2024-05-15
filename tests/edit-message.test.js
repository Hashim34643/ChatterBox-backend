const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Message = require("../models/message");
const User = require("../models/create-user");
const mongoURI = require("../models/db");

describe("Edit Message Endpoint", () => {
  let jwtToken;
  let userId;
  let roomId;
  let messageId;

  beforeAll(async () => {
    await mongoose.connect(mongoURI);
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
      .send({ name: "Test Room", description: "Test Room Description" });
    roomId = roomResponse.body.room._id;

    const messageResponse = await request(app)
      .post(`/${roomId}/send-message`)
      .set("Authorization", `Bearer ${jwtToken}`)
      .send({ content: "Test message", userId, roomId });
    messageId = messageResponse.body.messageData._id;
  });

  test("Should edit message content with status 200", async () => {
    const updatedContent = "Updated message content";

    const response = await request(app)
      .patch(`/${messageId}/edit`)
      .set("Authorization", `Bearer ${jwtToken}`)
      .send({ content: updatedContent, userId, roomId });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    const editedMessage = await Message.findById(messageId);
    expect(editedMessage.content).toBe(updatedContent);
    expect(editedMessage.edited).toBe(true);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
