const { insertMessage } = require('../models/messagesModel.js');

const handleSocketEvents = (io, socket) => {
    socket.on('join_chat', ({ chatId }) => {
        socket.join(chatId);
    });

    socket.on('send_message', async ({ chatId, userId, message }) => {
        try {
            const savedMessage = await insertMessage(chatId, userId, message);

            io.to(chatId).emit('receive_message', savedMessage);
        } catch (error) {
            console.error('Error saving message:', error);
            socket.emit('error', 'Error saving message');
        }
    });

    socket.on('leave_chat', ({ chatId }) => {
        socket.leave(chatId);
    });
};

module.exports = { handleSocketEvents };
