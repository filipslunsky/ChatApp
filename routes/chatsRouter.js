const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addNewChat,
    updateChatName,
    deleteChat,
} = require('../controllers/chatsController');

const chatsRouter = Router();

chatsRouter.post('/new', authenticateLoginToken, addNewChat);
chatsRouter.put('/', authenticateLoginToken, updateChatName);
chatsRouter.post('/delete', authenticateLoginToken, deleteChat);

module.exports = chatsRouter;