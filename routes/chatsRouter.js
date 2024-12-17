const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addNewChat,
    updateChatName,
} = require('../controllers/chatsController');

const chatsRouter = Router();

chatsRouter.post('/new', authenticateLoginToken, addNewChat);
chatsRouter.post('/', authenticateLoginToken, updateChatName);

module.exports = chatsRouter;