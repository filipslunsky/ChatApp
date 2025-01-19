const { insertMessage } = require('../models/messagesModel.js');
const { getUserById } = require('../models/usersModel.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}`);
    },
});

const upload = multer({ storage });

const handleSocketEvents = (io, socket) => {
    socket.on('join_chat', ({ chatId }) => {
        socket.join(chatId);
    });

    socket.on('send_message', async (data, callback) => {
        try {
            const { chatId, userId, message } = data;
            let photoPath = null;

            if (data.photo) {
                const fileBuffer = data.photo;
                const fileName = `photo-${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`;
                const filePath = path.join(__dirname, '../uploads', fileName);
                require('fs').writeFileSync(filePath, fileBuffer);
                photoPath = `/uploads/${fileName}`;
            }

            const savedMessage = await insertMessage(chatId, userId, message, photoPath);

            const user = await getUserById(userId);

            if (!user) {
                throw new Error(`User with ID ${userId} not found.`);
            }

            const fullMessage = {
                ...savedMessage,
                first_name: user.first_name,
                last_name: user.last_name,
                profile_picture: user.profile_picture,
            };

            io.to(chatId).emit('receive_message', fullMessage);

            if (callback) {
                callback({ success: true, message: fullMessage });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit('error', 'Error sending message');
        }
    });

    socket.on('leave_chat', ({ chatId }) => {
        socket.leave(chatId);
    });
};

module.exports = { handleSocketEvents };
