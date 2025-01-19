const { db } = require('../config/db.js');

const _addNewChat = async (email, chatName) => {
    try {
        return await db.transaction(async (trx) => {
            const user = await trx('users')
                .select('user_id')
                .where({ email })
                .first();

            if (!user) {
                return { success: false, message: 'User not found' };
            };
            const [chat] = await trx('chats')
                .insert({
                    chat_name: chatName,
                    created_at: new Date()
                })
                .returning(['chat_id']);

            const chatId = chat.chat_id;

            await trx('chat_participants').insert({
                chat_id: chatId,
                user_id: user.user_id
            });
            return { 
                success: true, 
                message: 'Chat successfully created and user added as a participant',
                chat_id: chatId
            };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error adding chat: ${error.message}` };
    }
};

const _updateChatName = async (chatId, chatName) => {
    try {
        const updatedRows = await db('chats')
            .update({ chat_name: chatName })
            .where({ chat_id: chatId });
        if (updatedRows === 0) {
            return { success: false, message: 'Chat not found or no changes made' };
        }
        return { success: true, message: 'Chat successfully renamed', chatId, chatName };
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error changing chat name: ${error.message}` };
    }
};

const _deleteChat = async (chatId) => {
    try {
        return await db.transaction(async (trx) => {
            const chatExists = await trx('chats')
                .where({ chat_id: chatId })
                .first();
            if (!chatExists) {
                return { success: false, message: 'Chat does not exist' };
            }
            await trx('chats').where({chat_id: chatId}).delete();
            return { success: true, message: 'Chat successfully deleted' };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error deleting chat: ${error.message}` };
    }
};

const _addUserToChat = async (email, chatId) => {
    try {
        return await db.transaction(async (trx) => {
            const user = await trx('users')
                .select('user_id')
                .where({ email })
                .first();

            if (!user) {
                return { success: false, message: 'User not found' };
            }
            const userId = user.user_id;

            const chat = await trx('chats')
                .select('chat_id')
                .where({ chat_id: chatId })
                .first();

            if (!chat) {
                return { success: false, message: 'Chat not found' };
            }

            const isParticipant = await trx('chat_participants')
                .where({ user_id: userId, chat_id: chatId })
                .first();

            if (isParticipant) {
                return { success: false, message: 'User is already a participant of the chat' };
            }

            await trx('chat_participants').insert({
                user_id: userId,
                chat_id: chatId
            });

            return { success: true, message: 'User successfully added to the chat' };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error adding user to chat: ${error.message}` };
    }
};

const _removeUserFromChat = async (email, chatId) => {
    try {
        return await db.transaction(async (trx) => {
            const user = await trx('users')
                .select('user_id')
                .where({ email })
                .first();

            if (!user) {
                return { success: false, message: 'User not found' };
            }
            const userId = user.user_id;

            const chat = await trx('chats')
                .select('chat_id')
                .where({ chat_id: chatId })
                .first();

            if (!chat) {
                return { success: false, message: 'Chat not found' };
            }

            const isParticipant = await trx('chat_participants')
                .where({ user_id: userId, chat_id: chatId })
                .first();

            if (!isParticipant) {
                return { success: false, message: 'User is not a participant of the chat' };
            }

            await trx('chat_participants')
                .where({
                    user_id: userId,
                    chat_id: chatId
                })
                .delete();

            return { success: true, message: 'User successfully removed from the chat' };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error adding user to chat: ${error.message}` };
    }
};

const _getParticipantsByChatId = async (chatId) => {
    try {
        return await db.transaction(async (trx) => {
            const chat = await trx('chats')
                .select('chat_id')
                .where({ chat_id: chatId })
                .first();

            if (!chat) {
                return { success: false, message: 'Chat not found' };
            }

            const chatParticipants = await trx('chat_participants')
                .select('chat_participants.user_id', 'users.first_name', 'users.last_name', 'users.email', 'users.profile_picture')
                .join('users', 'chat_participants.user_id', '=', 'users.user_id')
                .where({ 'chat_participants.chat_id': chatId });

            return { success: true, chatParticipants };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error fetching chat participants: ${error.message}` };
    }
};

const _getChatsByParticipantEmail = async (email) => {
    try {
        return await db.transaction(async (trx) => {
            const user = await trx('users')
                .select('user_id')
                .where({ email })
                .first();

            if (!user) {
                return { success: false, message: 'User not found' };
            }

            const userId = user.user_id;

            const chats = await trx('chat_participants')
                .select('chat_participants.chat_id', 'chats.chat_name', 'chats.created_at')
                .join('chats', 'chat_participants.chat_id', '=', 'chats.chat_id')
                .where({ 'chat_participants.user_id': userId });

            const chatsWithParticipants = await Promise.all(
                chats.map(async (chat) => {
                    const participants = await trx('chat_participants')
                        .select('users.first_name', 'users.last_name', 'users.email')
                        .join('users', 'chat_participants.user_id', '=', 'users.user_id')
                        .where({ 'chat_participants.chat_id': chat.chat_id });

                    return {
                        chat_id: chat.chat_id,
                        chat_name: chat.chat_name,
                        created_at: chat.created_at,
                        participants,
                    };
                })
            );

            return { success: true, chats: chatsWithParticipants };
        });
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error fetching chats: ${error.message}` };
    }
};

module.exports = {
    _addNewChat,
    _updateChatName,
    _deleteChat,
    _addUserToChat,
    _removeUserFromChat,
    _getParticipantsByChatId,
    _getChatsByParticipantEmail,
};