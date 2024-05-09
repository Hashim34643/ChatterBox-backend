const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoURI = require("../models/db");

describe("GET /users", () => {
    beforeAll(async () => {
        await mongoose.connect(mongoURI);
        await mongoose.connection.dropDatabase();
    });

    test("Should respond with status 200 and list of users", async () => {
        const newUser1 = {
            username: "TestUser1",
            firstName: "TestFirstName1",
            lastName: "TestLastName1",
            email: "testuser1@example.com",
            password: "TestPassword1",
            confirmPassword: "TestPassword1"
        };
        const newUser2 = {
            username: "TestUser2",
            firstName: "TestFirstName2",
            lastName: "TestLastName2",
            email: "testuser2@example.com",
            password: "TestPassword2",
            confirmPassword: "TestPassword2"
        };
        await request(app).post("/create-user").send(newUser1);
        await request(app).post("/create-user").send(newUser2);
        const response = await request(app).get("/users");
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveLength(2);
    });

    test("Should respond with status 500 if an error occurs", async () => {
        await mongoose.connection.close();
        const response = await request(app).get("/users");
        expect(response.statusCode).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Internal server error");
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});
