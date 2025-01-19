import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from '../../assets/img/avatar.jpg';
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
                <Link to={'/user/info'} className="navbarUserContainer">
                    <span className="navbarUsername">{`${user.firstName} ${user.lastName}`}</span>
                    <img className="navbarProfilePicture" src={user.profilePicture ? `${BASE_URL}${user.profilePicture}` : avatar} alt="photo" />
                </Link>
            </div>
        </>
    );
}
 
export default Navbar;