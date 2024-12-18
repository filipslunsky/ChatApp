import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getChats } from "./state/slice";

const Chat = () => {
    const dispatch = useDispatch();
    
    const chats = useSelector(state => state.chats.chats);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        dispatch(getChats(user.email));
    }, []);

    useEffect(() => {
        console.log(chats);

    }, []);

    return (
        <>
            {
                chats.map(item => {
                    return (
                        <div className="chatItemContainer" key={item.chat_id}>
                            <p className="chatItemName">
                                {
                                    item.chat_name === null
                                    ?
                                    'unnamed chat'
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