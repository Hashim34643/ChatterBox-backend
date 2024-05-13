const express = require('express');
const roomController = require('../controllers/roomController');
const isAuth = require('../middleware/auth');

const updateRoomRouter = express.Router();

updateRoomRouter.patch('/:roomId', isAuth, roomController);

module.exports = updateRoomRouter;
