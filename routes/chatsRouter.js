const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addNewChat,
    updateChatName,
    deleteChat,
    addUserToChat,
    removeUserFromChat,
    getParticipantsByChatId,
    getChatsByParticipantEmail,
} = require('../controllers/chatsController');

const chatsRouter = Router();

chatsRouter.post('/new', authenticateLoginToken, addNewChat);
chatsRouter.put('/', authenticateLoginToken, updateChatName);
chatsRouter.post('/delete', authenticateLoginToken, deleteChat);

chatsRouter.post('/participants/new', authenticateLoginToken, addUserToChat);
chatsRouter.post('/participants/delete', authenticateLoginToken, removeUserFromChat);

chatsRouter.post('/participants/all', authenticateLoginToken, getParticipantsByChatId);
chatsRouter.post('/all', authenticateLoginToken, getChatsByParticipantEmail);

module.exports = chatsRouter;