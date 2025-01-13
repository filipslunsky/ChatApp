import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ChatUsers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { chatId } = useParams();

    const handleBackClick = () => {
        navigate(`/chat/${chatId}`);
    };

    return (
        <>
            <button onClick={handleBackClick}>Go back</button>
            <h2>Users for Chat ID: {chatId}</h2>
        </>
    );
}
 
export default ChatUsers;