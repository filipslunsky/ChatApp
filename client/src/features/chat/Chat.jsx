import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getChats, addChat } from "./state/slice";

const Chat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newChatRef = useRef();
    
    const chats = useSelector(state => state.chats.chats);
    const user = useSelector(state => state.user.user);
    const chatsStatus = useSelector(state => state.chats.chatsStatus);
    const newChatStatus = useSelector(state => state.chats.newChatStatus);

    useEffect(() => {
        dispatch(getChats(user.email));
    }, [newChatStatus]);

    const handleClick = (chatId) => {
        navigate(`/chat/${chatId}`);
    };

    const handleAddChat = () => {
        let chatName = newChatRef.current.value;
        dispatch(addChat(chatName));
        newChatRef.current.value = '';
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
                        <div className="chatItemContainer" key={item.chat_id} onClick={() => {handleClick(item.chat_id)}}>
                            <p className="chatItemName">
                                {
                                    item.chat_name === null
                                    ?
                                    'Direct Chat'
                                    :
                                    item.chat_name
                                }
                            </p>
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