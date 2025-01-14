import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeSocket, sendMessage, leaveChat, getMessages } from './state/socketSlice.js';

const ChatDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const messages = useSelector((state) => state.socket.messages);
    const user = useSelector((state) => state.user.user);

    const [newMessage, setNewMessage] = useState('');

    const { chatId } = useParams();

    useEffect(() => {
        dispatch(getMessages({ chatId }));
    }, [dispatch, chatId]);

    useEffect(() => {
        dispatch(initializeSocket(chatId));

        return () => {
            dispatch(leaveChat(chatId));
        };
    }, [dispatch, chatId]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        dispatch(sendMessage(chatId, newMessage, user.userId));
        setNewMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleBackClick = () => {
        navigate('/chat');
    };

    const handleUsersClick = () => {
        navigate(`/chat-users/${chatId}`);
    };

    return (
        <>
            <button onClick={handleBackClick}>Go back</button>
            <button onClick={handleUsersClick}>Users</button>
            <h2>Chat ID: {chatId}</h2>
            <div>
            {messages.map((msg) => (
                <div
                key={msg.message_id}
                className={msg.user_id === user.userId ? 'myMessage' : 'otherMessage'}
                >
                    <span>{msg.user_id === user.userId ? 'You' : `${msg.first_name} ${msg.last_name}`}:</span> {msg.message}
                </div>
            ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
        </>
    );
};

export default ChatDetail;
