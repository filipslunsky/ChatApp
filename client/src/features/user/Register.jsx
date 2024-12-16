import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, resetRegisterStatus } from './state/slice.js';
import './userForms.css';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerStatus = useSelector(state => state.user.registerStatus);

    const [passwordMatch, setPasswordMatch] = useState(true);
    const [success, setSuccess] = useState(false);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
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
        if (registerStatus === 'success') {
            setSuccess(true);
            dispatch(resetRegisterStatus());
        }
    }, [registerStatus, dispatch]);

    const handleRegister = () => {
        if (firstNameRef.current.value.length === 0 || lastNameRef.current.value.length === 0 || emailRef.current.value.length === 0 || passwordRef.current.value.length === 0) return;

        const newUser = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        dispatch(registerUser(newUser));
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <>
            {
                success
                ?
                <div className="userStatusContainer">
                    <p className='userStatusMessage'>
                        Congratulations, you have successfully registered, you may now proceed to log in.
                    </p>
                    <Link to={'/login'}>Login</Link>
                </div>
                :
                <div className="userFormContainer">
                <h2 className="userFormName">Register New User</h2>
                <div className="userInputContainer">
                    <input
                    type="text"
                    className='userInputField'
                    ref={firstNameRef}
                    placeholder='first name'
                    required
                    />
                </div>
                <div className="userInputContainer">
                    <input
                    type="text"
                    className='userInputField'
                    ref={lastNameRef}
                    placeholder='last name'
                    required
                    />
                </div>
                <div className="userInputContainer">
                    <input
                    type="email"
                    className='userInputField'
                    ref={emailRef}
                    placeholder='email address'
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
                    <button className='userConfirmButton' onClick={handleRegister}>Register</button>
                    <button className="userCancelButton" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
            }
        </>
    );
}
 
export default Register;