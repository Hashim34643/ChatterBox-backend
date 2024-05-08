const express = require("express");
const loginController = require("../controllers/login");
const {validateUserLogin, userValidation} = require("../middleware/validation/create-user");

const loginRouter = express.Router();

loginRouter.post("/login", validateUserLogin, userValidation, loginController);

module.exports = loginRouter;