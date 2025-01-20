import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getParticipantsByChatId, removeUser, addUser, getChats } from "./state/slice.js";
import mobilePhone from '../../assets/img/phone_color.png';
import avatar from '../../assets/img/avatar.jpg';
import backArrow from '../../assets/img/arrow-back.png';
import './chatUsers.css';

const ChatUsers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [removeUserId, setRemoveUserId] = useState(null);
    const [newUser, setNewUser] = useState(false);
    const [clickLeave, setClickLeave] = useState(false);

    const user = useSelector(state => state.user.user);
    const participants = useSelector(state => state.chats.currentParticipants);
    const removeUserStatus = useSelector(state => state.chats.removeUserStatus);
    const addUserStatus = useSelector(state => state.chats.addUserStatus);
    const chats = useSelector(state => state.chats.chats);

    const { chatId } = useParams();

    const BASE_URL = `${import.meta.env.VITE_API_URL}`;

    const emailRef = useRef();

    useEffect(() => {
        dispatch(getChats(user.email));
    }, []);

    const selectedChat = chats.find(chat => chat.chat_id == chatId);

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
        setRemoveUserId(null);
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

    const handleClickLeave = () => {
        setClickLeave(true);
    };

    const handleClickNoLeave = () => {
        setClickLeave(false);
    };

    const handleLeave = () => {
        dispatch(removeUser({email: user.email, chatId}));
        navigate('/chat');
    };

    return (
        <>
            <div className="detailBackground"></div>
            <img className="phoneImage" src={mobilePhone} alt="phone" />
            <div className="usersMainControlsContainer">
                <button className="usersBackButton" onClick={handleBackClick}><img className="backArrowImage" src={backArrow} alt="arrow" /></button>
                {selectedChat ? (
                    <h2 className="usersChatName">{selectedChat.chat_name}</h2>
                    ) : (
                        <h2>Loading...</h2>
                )}
            </div>
            <div className="leaveChatContainer">
                {
                    clickLeave
                    ?
                    <div className="confirmContainer">
                        <p className="confirmQuestion">Are you sure you want to leave this chat?</p>
                        <div className="yesNoContainer">
                            <button className="yesButton" onClick={handleLeave}>yes</button>
                            <button className="noButton" onClick={handleClickNoLeave}>no</button>
                        </div>
                    </div>
                    :
                    <button className="leaveButton" onClick={handleClickLeave}>X leave this chat</button>
                }
            </div>
            <div className="chatUsersListContainer">
            {
                participants.map(item => {
                    return (
                        item.email !== user.email
                        ?
                        <div className="chatUserSingleContainer" key={item.user_id}>
                            <span className="chatUserName">{`${item.first_name} ${item.last_name}`}</span>
                            <img className="usersProfilePicture" src={item.profile_picture ? `${BASE_URL}${item.profile_picture}` : avatar} />
                            {
                                item.user_id === removeUserId
                                ?
                                <div className="confirmContainer">
                                    <p className="confirmQuestion">Are you sure you want to remove {`${item.first_name} ${item.last_name}`} from this chat?</p>
                                    <div className="yesNoContainer">
                                        <button className="yesButton" onClick={() => {handleRemove(item.email)}}>yes</button>
                                        <button className="noButton" onClick={handleClickNoRemove}>no</button>
                                    </div>
                                </div>
                                :
                                <button className="leaveButton" onClick={() => {handleClickRemove(item.user_id)}}>remove</button>
                            }
                        </div>
                        :
                        ''
                    )
                })
            }
            </div>
            <div className="newUserContainer">
                {
                    newUser
                    ?
                    <div>
                        <input className="addUserInput" type="text" placeholder="email address" ref={emailRef} />
                        <button  className="addUserButtonAdd" onClick={handleAddNewUser}>add</button>
                        <button className="addUserButtonCancel" onClick={handleCancelNewUser}>X</button>
                    </div>
                    :
                    <button className="addUserButton" onClick={handleClickNewUser}>+ add a user</button>
                }
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
 
export default ChatUsers;