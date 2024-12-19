const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    getMessagesByChatId,
} = require('../controllers/messagesController.js');

const messagesRouter = Router();

messagesRouter.post('/all', authenticateLoginToken, getMessagesByChatId);

module.exports = messagesRouter;