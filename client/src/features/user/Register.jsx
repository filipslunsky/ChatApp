import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './userForms.css';

const Register = () => {
    const dispatch = useDispatch();

    const [passwordMessage, setPasswordMessage] = useState('');

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordCheckRef = useRef();

    const checkPassword = () => {
        if (passwordRef.current.value.length === 0) return;
        if (passwordRef.current.value === passwordCheckRef.current.value) {
            setPasswordMessage('passwords match');
        } else {
            setPasswordMessage('passwords do not match');
        }
    };

    return (
        <>
            <div className="userFormContainer">
                <h2 className="userFormName">Register New User</h2>
                <div className="userInputContainer">
                    <input
                    type="text"
                    className='userInputField'
                    ref={firstNameRef}
                    placeholder='first name'
                    />
                </div>
                <div className="userInputContainer">
                    <input
                    type="text"
                    className='userInputField'
                    ref={lastNameRef}
                    placeholder='last name'
                    />
                </div>
                <div className="userInputContainer">
                    <input
                    type="email"
                    className='userInputField'
                    ref={emailRef}
                    placeholder='email address'
                    />
                </div>
                <div className="userInputContainer">
                    <input
                    type="password"
                    className='userInputField'
                    ref={passwordRef}
                    placeholder='password'
                    onChange={checkPassword}
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
                    <span className='userInputAlert'>{passwordMessage}</span>
                </div>
                <div className="userControlsContainer">
                    <button className='userConfirmButton'>Register</button>
                    <button className="userCancelButton">Cancel</button>
                </div>
            </div>
        </>
    );
}
 
export default Register;