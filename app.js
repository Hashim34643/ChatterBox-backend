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
const updateUserRouter = require("./routes/update-user");
const deleteAccountRouter = require("./routes/delete-user");
const roomRouter = require("./routes/room");
const getAllRoomRouter = require("./routes/get-all-rooms");
const getRoomById = require("./routes/get-room-by-id");
const updateRoomRouter = require("./routes/update-room");
const deleteRoomRouter = require("./routes/delete-room");
const messageRouter = require("./routes/message");
const getMessagesRouter = require("./routes/get-messages");
const editMessageRouter = require("./routes/edit-message");
const deleteMessageRouter = require("./routes/delete-message");
 
const app = express();
app.use(cors());
app.use(express.json());

app.use(createUserRouter);
app.use(loginRouter);
app.use(getUsersRouter);
app.use(getUserByIdRouter);
app.use(updateUserRouter);
app.use(deleteAccountRouter);
app.use(roomRouter);
app.use(getAllRoomRouter);
app.use(getRoomById);
app.use(updateRoomRouter);
app.use(deleteRoomRouter);
app.use(messageRouter);
app.use(getMessagesRouter);
app.use(editMessageRouter);
app.use(deleteMessageRouter);

const server = http.createServer(app);

server.listen(6957, () => {
    console.log("Server is listening on port 6957");
});

module.exports = server;