import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from './state/slice.js';
import './userForms.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedIn = useSelector(state => state.user.loggedIn);
    const logMessage = useSelector(state => state.user.logMessage);

    const [error, setError] = useState(null);

    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        if (loggedIn) {
            navigate('/user/info');
        }
    }, [loggedIn, navigate]);

    useEffect(() => {
        if (logMessage) {
            setError(null);
        }
    }, [logMessage]);

    const handleLogin = () => {
        if (emailRef.current.value.length === 0 || passwordRef.current.value.length === 0) return;

        const userInfo = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        dispatch(loginUser(userInfo));
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <>
            <div className="userFormContainer">
                <h2 className="userFormName">Log In</h2>
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
                    required
                    />
                </div>
                <div className="userControlsContainer">
                    <button className='userConfirmButton' onClick={handleLogin}>Login</button>
                    <button className="userCancelButton" onClick={handleCancel}>Cancel</button>
                </div>
                {logMessage && <p style={{ color: 'red' }}>{logMessage}</p>}
                <div className="userStatusContainer">
                    <p className='userStatusMessage'>You don't have an account yet?</p>
                    <Link to='/user/register'>CREATE ACCOUNT</Link>
                </div>
            </div>
        </>
    );
}
 
export default Login;