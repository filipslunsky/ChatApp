import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeSocket, sendMessage, leaveChat, getMessages } from './state/socketSlice.js';

const ChatDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const messages = useSelector((state) => state.socket.messages);
    const user = useSelector((state) => state.user.user);

    const [newMessage, setNewMessage] = useState('');
    const [photo, setPhoto] = useState(null);

    const photoInputRef = useRef(null);

    const BASE_URL = `${import.meta.env.VITE_API_URL}`;

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
        if (!newMessage.trim() && !photo) return;

        dispatch(sendMessage(chatId, newMessage, user.userId, photo));

        setNewMessage('');
        setPhoto(null);

        if (photoInputRef.current) {
            photoInputRef.current.value = '';
        }
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
        }
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
                        <span>{msg.user_id === user.userId ? 'You' : `${msg.first_name} ${msg.last_name}`}:</span>
                        {msg.message ? msg.message : ''}
                        {msg.photo_path ? <img src={`${BASE_URL}${msg.photo_path}`} alt="message photo" /> : ''}
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={photoInputRef}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </>
    );
};

export default ChatDetail;
