const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
require("./models/db");
const http = require("http");

const createUserRouter = require("./routes/create-user");
const loginRouter = require("./routes/login");
const getUsersRouter = require("./routes/get-all-users");
const getUserByIdRouter = require("./routes/get-user-by-id");

const app = express();
app.use(cors());
app.use(express.json());

app.use(createUserRouter);
app.use(loginRouter);
app.use(getUsersRouter);
app.use(getUserByIdRouter);

const server = http.createServer(app);

server.listen(6957, () => {
    console.log("Server is listening on port 6957");
});

module.exports = server;