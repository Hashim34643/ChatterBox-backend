const express = require("express");
const getUsers = require("../controllers/userController");

const getUsersRouter = express.Router();

getUsersRouter.get("/users", getUsers);

module.exports = getUsersRouter;
