const { db } = require('../config/db.js');

const insertMessage = async (chatId, userId, message, photoPath = null) => {
    try {
        const result = await db('messages')
            .insert({
                chat_id: chatId,
                user_id: userId,
                message: message,
                photo_path: photoPath,
            })
            .returning(['message_id', 'chat_id', 'user_id', 'message', 'photo_path', 'created_at']);
        
        return result[0];
    } catch (error) {
        console.error("Error inserting message:", error);
        throw new Error('Error saving message');
    }
};

const _getMessagesByChatId = async (chatId) => {
    try {
        const result = await db('messages')
            .join('users', 'users.user_id', 'messages.user_id')
            .where({ 'messages.chat_id': chatId })
            .orderBy('messages.created_at', 'asc')
            .select(
                'messages.message_id',
                'messages.chat_id',
                'messages.message',
                'messages.photo_path',
                'messages.created_at',
                'messages.user_id',
                'users.first_name',
                'users.last_name',
                'users.profile_picture'
            );
        
        return result;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw new Error('Error fetching messages');
    }
};

module.exports = {
    insertMessage,
    _getMessagesByChatId,
};
