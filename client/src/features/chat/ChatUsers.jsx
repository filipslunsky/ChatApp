import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getParticipantsByChatId, removeUser, addUser } from "./state/slice.js";

const ChatUsers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [removeUserId, setRemoveUserId] = useState(null);
    const [newUser, setNewUser] = useState(false);

    const participants = useSelector(state => state.chats.currentParticipants);
    const removeUserStatus = useSelector(state => state.chats.removeUserStatus);
    const addUserStatus = useSelector(state => state.chats.addUserStatus);

    const { chatId } = useParams();

    const emailRef = useRef();

    useEffect(() => {
        dispatch(getParticipantsByChatId(chatId));
    }, [removeUserStatus, addUserStatus]);

    const handleBackClick = () => {
        navigate(`/chat/${chatId}`);
    };

    const handleClickNewUser = () => {
        setNewUser(true);
    };

    const handleCancelNewUser = () => {
        setNewUser(false);
    };

    const handleAddNewUser = () => {
        const email = emailRef.current.value;
        dispatch(addUser({email, chatId}));
        setNewUser(false);
    };

    const handleClickRemove = (userId) => {
        setRemoveUserId(userId);
    };

    const handleClickNoRemove = () => {
        setRemoveUserId(null);
    };

    const handleRemove = (email) => {
        dispatch(removeUser({email, chatId}));
    };

    return (
        <>
            <button onClick={handleBackClick}>Go back</button>
            <h2>Users for Chat ID: {chatId}</h2>
            {
                newUser
                ?
                <div>
                    <input type="text" placeholder="email address" ref={emailRef} />
                    <button onClick={handleAddNewUser}>add</button>
                    <button onClick={handleCancelNewUser}>cancel</button>
                </div>
                :
                <button onClick={handleClickNewUser}>add a new user</button>
            }
            <button>leave chat</button>
            {
                participants.map(item => {
                    return (
                        <div key={item.user_id}>
                            <span>{`${item.first_name} ${item.last_name}`}</span>
                            {
                                item.user_id === removeUserId
                                ?
                                <div>
                                    <p>Are you sure you want to remove {`${item.first_name} ${item.last_name}`} from this chat?</p>
                                    <button onClick={() => {handleRemove(item.email)}}>yes</button>
                                    <button onClick={handleClickNoRemove}>no</button>
                                </div>
                                :
                                <button onClick={() => {handleClickRemove(item.user_id)}}>x</button>
                            }
                        </div>
                    )
                })
            }
        </>
    );
}
 
export default ChatUsers;