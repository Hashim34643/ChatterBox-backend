const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Room = require("../models/room");
const mongoURI = require("../models/db");
const jwt = require("jsonwebtoken");

describe("DELETE /rooms/:roomId", () => {
    let jwtToken;
    let roomId;
    let userId;

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
                description: "Test Room Description"
            });
        roomId = roomResponse.body.room._id;
    });

    test("Should delete the room with status 200", async () => {
        const response = await request(app)
            .delete(`/rooms/delete/${roomId}`)
            .set("Authorization", `Bearer ${jwtToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Room deleted successfully");

        const deletedRoom = await Room.findById(roomId);
        expect(deletedRoom).toBeNull();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});
