const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
require("./models/db");
const http = require("http");

const createUserRouter = require("./routes/create-user");

const app = express();
app.use(cors());
app.use(express.json());

app.use(createUserRouter);

const server = http.createServer(app);

server.listen(6957, () => {
    console.log("Server is listening on port 6957");
});

module.exports = server;