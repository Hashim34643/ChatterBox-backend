const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoURI = require("../models/db");
const jwt = require("jsonwebtoken");
const Room = require("../models/room");
const User = require("../models/create-user")

describe("POST /room/create", () => {
    let jwtToken;

    beforeAll(async () => {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        await mongoose.connection.dropDatabase();

        const testUser = await User.create({
            username: "TestUserUpdate",
            firstName: "OriginalFirstName",
            lastName: "OriginalLastName",
            email: "testupdate@example.com",
            password: "password",
        });
        const loginUser = await request(app).post("/login").send({
            email: "testupdate@example.com",
            password: "password"
        })
        jwtToken = loginUser.body.token;
        userId = testUser._id;
    });

    test("Should respond with status 200 and create a new room", async () => {
        const roomData = {
            name: "Test Room",
            description: "This is a test room",
            createdBy: userId
        };

        const response = await request(app)
            .post("/room/create")
            .set("Authorization", jwtToken)
            .send(roomData);
            console.log(userId)

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("message", "Room created successfully");

        const createdRoom = await Room.findOne({ name: roomData.name });
        expect(createdRoom).toBeTruthy();
        expect(createdRoom.description).toBe(roomData.description);
        expect(createdRoom.createdBy).toEqual(roomData.createdBy);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});
