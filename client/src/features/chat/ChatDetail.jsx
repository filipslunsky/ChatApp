import { useParams, useNavigate } from "react-router-dom";

const ChatDetail = () => {
    const navigate = useNavigate();
    const { chatId } = useParams();

    const handleBackClick = () => {
        navigate('/chat');
    };

    return (
        <>
            <button onClick={handleBackClick}>Go back</button>
            <h2>Chat id: {chatId}</h2>
        </>
    );
}
 
export default ChatDetail;