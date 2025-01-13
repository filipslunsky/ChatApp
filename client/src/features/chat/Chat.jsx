import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getChats, addChat, deleteChat } from "./state/slice";

const Chat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newChatRef = useRef();
    
    const chats = useSelector(state => state.chats.chats);
    const user = useSelector(state => state.user.user);
    const chatsStatus = useSelector(state => state.chats.chatsStatus);
    const newChatStatus = useSelector(state => state.chats.newChatStatus);
    const deleteChatStatus = useSelector(state => state.chats.deleteChatStatus);

    useEffect(() => {
        dispatch(getChats(user.email));
    }, [newChatStatus, deleteChatStatus]);

    const handleClick = (chatId) => {
        navigate(`/chat/${chatId}`);
    };

    const handleAddChat = () => {
        let chatName = newChatRef.current.value;
        dispatch(addChat(chatName));
        newChatRef.current.value = '';
    };

    const handleRemove = (chatId) => {
        dispatch(deleteChat(chatId));
    };

    return (
        <>
            <input type="text" ref={newChatRef} placeholder="new chat name" />
            <button onClick={handleAddChat}>add</button>
            {
                chatsStatus !== 'success'
                ?
                <p>Loading chats...</p>
                :
                chats.map(item => {
                    return (
                        <div className="chatItemContainer" key={item.chat_id}>
                            <div className="chatItemName" onClick={() => {handleClick(item.chat_id)}}>
                                {
                                    item.chat_name === null
                                    ?
                                    'Direct Chat'
                                    :
                                    item.chat_name
                                }
                            </div>
                            <button onClick={() => {handleRemove(item.chat_id)}}>-</button>
                            <div className="chatParticipantsContainer">
                                {
                                    item.participants.map((person, index) => {
                                        return (
                                            person.email !== user.email
                                            ?
                                            <span className="chatParticipant" key={index}>{`${person.first_name} ${person.last_name}`}</span>
                                            :
                                            ''
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </>
    );
}
 
export default Chat;