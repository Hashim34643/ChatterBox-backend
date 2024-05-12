const express = require('express');
const roomController = require('../controllers/get-all-rooms');
const isAuth = require('../middleware/auth');

const getAllRoomRouter = express.Router();

getAllRoomRouter.get('/rooms', isAuth, roomController);

module.exports = getAllRoomRouter;
