import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, deleteUser } from "./state/slice";
import { useNavigate } from "react-router-dom";
import './userForms.css';

const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [deleteUserClicked, setDeleteUserClicked] = useState(false);
    
    const user = useSelector(state => state.user.user);

    const handleEditClick = () => {
        navigate('/user/edit');
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const handleClickDelete = () => {
        setDeleteUserClicked(true);
    };

    const handleClickNo = () => {
        setDeleteUserClicked(false);
    };

    const handleClickYes = () => {
        const email = user.email;
        dispatch(deleteUser({email}));
        navigate('/');
    };

    return (
        <>
            <div className="userInfoContainer">
                <div className="userInfoItems">
                    <p className="userInfoItem">First Name: {user.firstName}</p>
                    <p className="userInfoItem">Last Name: {user.lastName}</p>
                    <p className="userInfoItem">Email Address: {user.email}</p>
                </div>
                <div className="userControlsContainer">
                    <button className='userConfirmButton' onClick={handleEditClick}>Edit User Info</button>
                    <button className="userCancelButton" onClick={handleLogout}>Log Out</button>
                    {
                        !deleteUserClicked
                        ?
                        <button className="userDeleteButton" onClick={handleClickDelete}>Delete Account</button>
                        :
                        <div className="userDeleteContainer">
                            <h4 className="userDeleteQuestion">Are you sure you want to delete your account?</h4>
                            <div className="userDeleteControls">
                                <button className="userCancelButton" onClick={handleClickNo}>No, take me back.</button>
                                <button className="userDeleteButton" onClick={handleClickYes}>Yes, I am sure.</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}
 
export default User;