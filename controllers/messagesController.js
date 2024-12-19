const {
    _getMessagesByChatId,
} = require('../models/messagesModel.js');

const getMessagesByChatId = async (req, res) => {
    const { chatId } = req.body;
    try {
        const data = await _getMessagesByChatId(chatId);
        res.status(200).json(data);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getMessagesByChatId,
};