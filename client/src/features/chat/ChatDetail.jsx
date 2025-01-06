import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeSocket, sendMessage, leaveChat } from './state/socketSlice.js';

const ChatDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const messages = useSelector((state) => state.socket.messages);

    const [newMessage, setNewMessage] = useState('');

    const { chatId } = useParams();

    useEffect(() => {
        dispatch(initializeSocket(chatId));

        return () => {
            dispatch(leaveChat(chatId));
        };
    }, [dispatch, chatId]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        dispatch(sendMessage(chatId, newMessage));
        setNewMessage('');
    };

    const handleBackClick = () => {
        navigate('/chat');
    };

    return (
        <>
            <button onClick={handleBackClick}>Go back</button>
            <h2>Chat id: {chatId}</h2>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.user_id}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
        </>
    );
}
 
export default ChatDetail;