const express = require('express');
const roomController = require('../controllers/update-room');
const isAuth = require('../middleware/auth');

const updateRoomRouter = express.Router();

updateRoomRouter.patch('/room/update/:roomId', isAuth, roomController);

module.exports = updateRoomRouter;
