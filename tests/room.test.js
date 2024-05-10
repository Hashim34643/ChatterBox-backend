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
        };

        const response = await request(app)
            .post(`/room/create/${userId}`)
            .set("Authorization", `Bearer ${jwtToken}`)
            .send(roomData);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("message", "Room created successfully");
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});
