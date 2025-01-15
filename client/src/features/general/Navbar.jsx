import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './navbar.css';

const Navbar = () => {
    const user = useSelector(state => state.user.user);

    const BASE_URL = `${import.meta.env.VITE_API_URL}`;

    return (
        <>
            <div className="navbarMainContainer">
                <div className="logoContainer">
                    <span className="logoText">ChutUp</span>
                </div>
                <div className="navbarContainer">
                    <Link to={'/chat'} className="navbarItem">Chats</Link>
                    <Link to={'/about'} className="navbarItem">About</Link>
                </div>
                <div className="navbarUserContainer">
                <Link to={'/user/info'} className="navbarItem">
                    {`${user.firstName} ${user.lastName}`}
                    <img className="navbarProfilePicture" src={`${BASE_URL}${user.profilePicture}`} alt="profile picture" />
                </Link>
                </div>
            </div>
        </>
    );
}
 
export default Navbar;