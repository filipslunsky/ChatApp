import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { editUser, resetEditStatus } from './state/slice.js';
import './userForms.css';

const UserEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const editStatus = useSelector(state => state.user.editStatus);
    const user = useSelector(state => state.user.user);

    const [passwordMatch, setPasswordMatch] = useState(true);
    const [success, setSuccess] = useState(false);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const passwordCheckRef = useRef();

    const checkPassword = () => {
        if (passwordRef.current.value.length === 0) return;
        if (passwordRef.current.value === passwordCheckRef.current.value) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    };

    useEffect(() => {
        if (editStatus === 'success') {
            setSuccess(true);
            dispatch(resetEditStatus());
        }
    }, [editStatus, dispatch]);

    const handleEdit = () => {
        if (firstNameRef.current.value.length === 0 || lastNameRef.current.value.length === 0 || passwordRef.current.value.length === 0) return;
        
        if (!passwordMatch) return;
        
        const newUserInfo = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: user.email,
            password: passwordRef.current.value
        };
        dispatch(editUser(newUserInfo));
    };

    const handleCancel = () => {
        navigate('/user/info');
    };

    return (
        <>
            {
                success
                ?
                <div className="userStatusContainer">
                    <p className='userStatusMessage'>
                        Your information has been successfully updated.
                    </p>
                    <Link to={'/user/info'}>Continue</Link>
                </div>
                :
                <div className="userFormContainer">
                <h2 className="userFormName">Update User Information</h2>
                <div className="userInputContainer">
                    <input
                    type="text"
                    className='userInputField'
                    ref={firstNameRef}
                    placeholder='first name'
                    defaultValue={user.firstName}
                    required
                    />
                </div>
                <div className="userInputContainer">
                    <input
                    type="text"
                    className='userInputField'
                    ref={lastNameRef}
                    placeholder='last name'
                    defaultValue={user.lastName}
                    required
                    />
                </div>
                <div className="userInputContainer">
                    <input
                    type="password"
                    className='userInputField'
                    ref={passwordRef}
                    placeholder='password'
                    onChange={checkPassword}
                    required
                    />
                </div>
                <div className="userInputContainer">
                    <input
                    type="password"
                    className='userInputField'
                    ref={passwordCheckRef}
                    placeholder='password repeat'
                    onChange={checkPassword}
                    />
                    {!passwordMatch ? <span className='userInputAlert'>passwords don't match</span> : ''}
                </div>
                <div className="userControlsContainer">
                    <button className='userConfirmButton' onClick={handleEdit}>Update</button>
                    <button className="userCancelButton" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
            }
        </>
    );
}
 
export default UserEdit;