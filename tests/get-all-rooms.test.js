const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/create-user");
const Room = require("../models/room");
const mongoURI = require("../models/db");

describe("Room Creation API Endpoints", () => {
  let jwtToken;
  let userId;

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
  });

  test("Should create a new room with status 201", async () => {
    const roomData = {
      name: "Test Room",
      description: "Description for Test Room"
    };

    const response = await request(app)
      .post(`/room/create/${userId}`)
      .set("Authorization", `Bearer ${jwtToken}`)
      .send(roomData);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Room created successfully");
    expect(response.body.room).toHaveProperty("name", roomData.name);
    expect(response.body.room).toHaveProperty("description", roomData.description);
    expect(response.body.room).toHaveProperty("createdBy", userId);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
