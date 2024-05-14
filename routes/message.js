const express = require('express');
const sendMessage = require('../controllers/message');
const isAuth = require('../middleware/auth');

const messageRouter = express.Router();

messageRouter.post('/:roomId/send-message', isAuth, sendMessage);

module.exports = messageRouter;
