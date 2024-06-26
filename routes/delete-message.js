const express = require('express');
const deleteMessageController = require('../controllers/delete-message');
const isAuth = require('../middleware/auth');

const deleteMessageRouter = express.Router();

deleteMessageRouter.delete('/:messageId/delete', isAuth, deleteMessageController);

module.exports = deleteMessageRouter;
