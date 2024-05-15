const express = require('express');
const editMessage = require('../controllers/message');
const isAuth = require('../middleware/auth');

const editMessageRouter = express.Router();

editMessageRouter.patch('/:messageId/edit', isAuth, editMessage);

module.exports = editMessageRouter;
