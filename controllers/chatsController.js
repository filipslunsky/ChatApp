const {
    _addNewChat,
    _updateChatName,
} = require('../models/chatsModel.js');

const addNewChat = async (req, res) => {
    const { email, chatName } = req.body;
    try {
        const data = await _addNewChat(email, chatName);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateChatName = async (req, res) => {
    const { chatId, chatName } = req.body;
    try {
        const data = await _updateChatName(chatId, chatName);
        if (data.success) {
            res.status(200).json(data);
        } else {
            res.status(400).json(data);
        };
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addNewChat,
    updateChatName,
};