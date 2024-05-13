const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Room = require("../models/room");
const mongoURI = require("../models/db");

describe("Room Update API Endpoint", () => {
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
  
      const roomData = {
        name: "Test Room",
        description: "Description for Test Room"
      };
  
      const createRoomResponse = await request(app)
        .post(`/room/create/${userId}`)
        .set("Authorization", `Bearer ${jwtToken}`)
        .send(roomData);
  
      roomId = createRoomResponse.body.room._id;

  });

  test("Should update room data with status 200", async () => {
    const updatedData = {
      name: "Updated Test Room",
      description: "Updated description"
    };

    const response = await request(app)
    .patch(`/room/update/${roomId}`)
    .set("Authorization", `Bearer ${jwtToken}`)
    .send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Room updated successfully");
    expect(response.body.room).toHaveProperty("name", updatedData.name);
    expect(response.body.room).toHaveProperty("description", updatedData.description);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
