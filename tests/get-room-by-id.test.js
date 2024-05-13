const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/create-user");
const Room = require("../models/room");
const mongoURI = require("../models/db");

describe("Get Room by ID API Endpoint", () => {
  let jwtToken;
  let userId;
  let roomId;

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
      .send({
        name: "Test Room",
        description: "Description for Test Room"
      });
    roomId = roomResponse.body.room._id;
  });

  test("Should retrieve room details by ID with status 200", async () => {
    const response = await request(app)
      .get(`/room/${roomId}`)
      .set("Authorization", `Bearer ${jwtToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.room).toHaveProperty("name", "Test Room");
    expect(response.body.room).toHaveProperty("description", "Description for Test Room");
    expect(response.body.room).toHaveProperty("createdBy", userId);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
