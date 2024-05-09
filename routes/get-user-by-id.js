const express = require("express");
const getUserInfo = require("../controllers/get-user-by-id");

const getUserByIdRouter = express.Router();

getUserByIdRouter.get("/user/:userId", getUserInfo);

module.exports = getUserByIdRouter;