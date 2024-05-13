const express = require('express');
const deleteRoomController = require('../controllers/delete-room');
const isAuth = require('../middleware/auth');

const deleteRoomRouter = express.Router();

deleteRoomRouter.delete('/rooms/delete/:roomId', isAuth, deleteRoomController);

module.exports = deleteRoomRouter;
