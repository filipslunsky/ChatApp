const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const { authenticateLoginToken } = require('../middlewares/authenticate.js');
const {
    addNewUser,
    loginUser,
    updateUser,
    deleteUser,
    updateProfilePicture,
} = require('../controllers/usersController.js');

const usersRouter = Router();

usersRouter.post('/register', addNewUser);
usersRouter.post('/login', loginUser);
usersRouter.put('/', authenticateLoginToken, updateUser);
usersRouter.post('/delete', authenticateLoginToken, deleteUser);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage });

usersRouter.post('/upload-profile-picture', upload.single('profile_picture'), updateProfilePicture);


module.exports = usersRouter;
