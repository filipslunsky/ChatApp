const { Router } = require('express');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addNewUser,
    loginUser,
    updateUser,
    deleteUser
} = require('../controllers/usersController.js');

const usersRouter = Router();

usersRouter.post('/register', addNewUser);
usersRouter.post('/login', loginUser);
usersRouter.put('/', authenticateLoginToken, updateUser);
usersRouter.post('/delete', authenticateLoginToken, deleteUser);

module.exports = usersRouter;
