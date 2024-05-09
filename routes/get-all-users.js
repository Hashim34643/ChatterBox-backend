const express = require("express");
const getUsers = require("../controllers/get-all-users");

const getUsersRouter = express.Router();

getUsersRouter.get("/users", getUsers);

module.exports = getUsersRouter;
