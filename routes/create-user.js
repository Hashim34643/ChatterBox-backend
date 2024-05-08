const express = require("express");
const createUser = require("../controllers/create-user");
const {validateCreateUser, userValidation} = require("../middleware/validation/create-user");

const createUserRouter = express.Router();

createUserRouter.post("/create-user", validateCreateUser, userValidation, createUser);

module.exports = createUserRouter;

