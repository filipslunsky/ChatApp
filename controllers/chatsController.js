const {
    _addNewChat,
    _updateChatName,
    _deleteChat,
    _addUserToChat,
    _removeUserFromChat,
    _getParticipantsByChatId,
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

const deleteChat = async (req, res) => {
    const { chatId } = req.body;
    try {
        const data = await _deleteChat(chatId);
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

const addUserToChat = async (req, res) => {
    const { email, chatId } = req.body;
    try {
        const data = await _addUserToChat(email, chatId);
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

const removeUserFromChat = async (req, res) => {
    const { email, chatId } = req.body;
    try {
        const data = await _removeUserFromChat(email, chatId);
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

const getParticipantsByChatId = async (res, req) => {
    const { chatId } = req.body;
    try {
        const data = await _getParticipantsByChatId(chatId);
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
    deleteChat,
    addUserToChat,
    removeUserFromChat,
    getParticipantsByChatId,
};