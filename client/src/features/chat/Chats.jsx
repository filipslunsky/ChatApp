import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getChats, addChat, editChat, deleteChat } from "./state/slice";
import mobilePhone from '../../assets/img/phone_color.png';
import './chats.css';

const Chat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [newChatName, setNewChatName] = useState('');
    const [editChatName, setEditChatName] = useState('');
    const [editChatId, setEditChatId] = useState(null);
    const [removeChatId, setRemoveChatId] = useState(null);
    
    const chats = useSelector(state => state.chats.chats);
    const user = useSelector(state => state.user.user);
    const chatsStatus = useSelector(state => state.chats.chatsStatus);
    const newChatStatus = useSelector(state => state.chats.newChatStatus);
    const deleteChatStatus = useSelector(state => state.chats.deleteChatStatus);
    const editChatStatus = useSelector(state => state.chats.editChatStatus);

    useEffect(() => {
        dispatch(getChats(user.email));
    }, [newChatStatus, deleteChatStatus, editChatStatus]);

    const handleClick = (chatId) => {
        navigate(`/chat/${chatId}`);
    };

    const handleAddChat = () => {
        if (newChatName.trim() === '') return;
        dispatch(addChat(newChatName));
        setNewChatName('');
    };

    const handleEditClick = (chatId) => {
        setEditChatId(chatId);
    };

    const handleEditCancel = () => {
        setEditChatId(null);
    };

    const handleEditChat = (chatId) => {
        if (editChatName.trim() === '') return;
        dispatch(editChat({chatId, chatName: editChatName}));
        setEditChatId(null);
        setEditChatName('');
    };

    const handleRemoveClick = (chatId) => {
        setRemoveChatId(chatId);
    };

    const handleRemoveCancel = () => {
        setRemoveChatId(null);
    };

    const handleRemove = (chatId) => {
        dispatch(deleteChat(chatId));
    };

    return (
        <>
            <div className="detailBackground"></div>
            <img className="phoneImage" src={mobilePhone} alt="phone" />
            <h2 className="chatsHeading">My Chats</h2>
            <div className="chatListContainer">
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
                                        'Unnamed Chat'
                                        :
                                        item.chat_name
                                    }
                                </div>
                                {
                                    editChatId === item.chat_id
                                    ?
                                    <div className="chatEditContainer">
                                        <input className="chatEditInput" type="text" onChange={(e) => {setEditChatName(e.target.value)}} defaultValue={item.chat_name} />
                                        <button className="chatEditCancel" onClick={handleEditCancel}>x</button>
                                        <button className="chatEditConfirm" onClick={() => {handleEditChat(item.chat_id)}}>ok</button>
                                    </div>
                                    :
                                    <button className="editChatButton" onClick={() => {handleEditClick(item.chat_id)}}>edit chat name</button>
                                }
                                {
                                    removeChatId === item.chat_id
                                    ?
                                    <div className="confirmContainer">
                                        <span className="confirmQuestion">Are you sure?</span>
                                        <div className="yesNoContainer">
                                            <button className="yesButton" onClick={() => {handleRemove(item.chat_id)}}>yes</button>
                                            <button className="noButton" onClick={handleRemoveCancel}>no</button>
                                        </div>
                                    </div>
                                    :
                                    <button className="leaveButton" onClick={() => {handleRemoveClick(item.chat_id)}}>delete chat</button>
                                }
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
            </div>
            <div className="addChatContainer">
                <input className="addChatInput" type="text" value={newChatName} onChange={(e) => {setNewChatName(e.target.value)}} placeholder="new chat name" />
                <button className="addChatButton" onClick={handleAddChat}>add</button>
            </div>
            <div className="rightContainer">
                <h2 className="rightContainerheading">Chut Up</h2>
                <p className="rightContainerParagraph">
                    Talk to your friends, send photos and more. Add your friends. It is simple, free and moreover everybody can add, remove chat members or delete the history so you can always be sure, your data is under your control.
                </p>
            </div>
        </>
    );
}
 
export default Chat;