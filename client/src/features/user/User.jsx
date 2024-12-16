import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "./state/slice";
import { useNavigate } from "react-router-dom";
import './userForms.css';

const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const user = useSelector(state => state.user.user);

    const handleEditClick = () => {
        navigate('/user/edit');
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <>
            <div className="userInfoContainer">
                <div className="userInfoItems">
                    <p className="userInfoItem">Name: {user.firstName}</p>
                    <p className="userInfoItem">Name: {user.lastName}</p>
                    <p className="userInfoItem">Name: {user.email}</p>
                </div>
                <div className="userControlsContainer">
                    <button className='userConfirmButton' onClick={handleEditClick}>Edit User Info</button>
                    <button className="userCancelButton" onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        </>
    );
}
 
export default User;