import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getParticipantsByChatId, removeUser } from "./state/slice.js";

const ChatUsers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [removeUserId, setRemoveUserId] = useState(null);

    const participants = useSelector(state => state.chats.currentParticipants);
    const removeUserStatus = useSelector(state => state.chats.removeUserStatus);

    const { chatId } = useParams();

    useEffect(() => {
        dispatch(getParticipantsByChatId(chatId));
    }, [removeUserStatus]);

    const handleBackClick = () => {
        navigate(`/chat/${chatId}`);
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
            <button>add a new user</button>
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