//  // create new chat
// change chat name
// delete chat


// add user to chat
// remove user from chat

// get all participants for chat

// get all chats by participants email

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
        db('chats')
        .update({chat_name: chatName})
        .where({chat_id: chatId});
        return { success: true, chatId, chatName };
    } catch (error) {
        console.error('Transaction error:', error);
        return { success: false, message: `Error changing chat name: ${error.message}` };
    }
};


module.exports = {
    _addNewChat,
    _updateChatName,
};