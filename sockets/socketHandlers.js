const { insertMessage } = require('../models/messagesModel.js');
const { getUserById } = require('../models/usersModel.js');

const handleSocketEvents = (io, socket) => {
    socket.on('join_chat', ({ chatId }) => {
        socket.join(chatId);
    });

    socket.on('send_message', async ({ chatId, userId, message }) => {
        try {
            const savedMessage = await insertMessage(chatId, userId, message);

            const user = await getUserById(userId);

            if (!user) {
                throw new Error(`User with ID ${userId} not found.`);
            }

            const fullMessage = {
                ...savedMessage,
                first_name: user.first_name,
                last_name: user.last_name,
            };

            io.to(chatId).emit('receive_message', fullMessage);
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
