const express = require('express');
const getMessagesRouter = express.Router();
const getMessagesByRoomId = require('../controllers/get-messages');

getMessagesRouter.get('/room/:roomId/messages', getMessagesByRoomId);

module.exports = getMessagesRouter;
