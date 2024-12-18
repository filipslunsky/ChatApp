const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addNewChat,
    updateChatName,
    deleteChat,
    addUserToChat,
    removeUserFromChat,
    getParticipantsByChatId,
} = require('../controllers/chatsController');

const chatsRouter = Router();

chatsRouter.post('/new', authenticateLoginToken, addNewChat);
chatsRouter.put('/', authenticateLoginToken, updateChatName);
chatsRouter.post('/delete', authenticateLoginToken, deleteChat);

chatsRouter.post('/participants/new', authenticateLoginToken, addUserToChat);
chatsRouter.post('/participants/delete', authenticateLoginToken, removeUserFromChat);

chatsRouter.post('/participants/all', authenticateLoginToken, getParticipantsByChatId);

module.exports = chatsRouter;