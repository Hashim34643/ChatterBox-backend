const express = require('express');
const roomController = require('../controllers/room');
const isAuth = require('../middleware/auth');

const roomRouter = express.Router();

roomRouter.post('/room/create', isAuth, roomController);

module.exports = roomRouter;
