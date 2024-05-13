const express = require('express');
const roomController = require('../controllers/get-room-by-id');
const isAuth = require('../middleware/auth');

const getRoomById = express.Router();

getRoomById.get('/room/:roomId', isAuth, roomController);

module.exports = getRoomById;
