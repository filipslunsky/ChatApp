import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './navbar.css';

const Navbar = () => {
    const loggedIn = useSelector(state => state.user.loggedIn);
    const user = useSelector(state => state.user.user);

    return (
        <>
            <div className="navbarMainContainer">
                <div className="logoContainer">
                    <span className="logoText">ChutUp</span>
                </div>
                <div className="navbarContainer">
                    <Link to={'/dashboard'} className="navbarItem">Dashboard</Link>
                    <Link to={'/chat'} className="navbarItem">Chat</Link>
                    <Link to={'/about'} className="navbarItem">About</Link>
                </div>
                <div className="navbarUserContainer">
                <Link to={'/user/info'} className="navbarItem">{`${user.firstName} ${user.lastName}`}</Link>
                </div>
            </div>
        </>
    );
}
 
export default Navbar;