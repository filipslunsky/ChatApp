import './about.css';


const About = () => {
    return (
        <>
            <div className="infoContainer">
                <h2 className="infoHeader">About</h2>
                <p className="infoParagraph">This is a React chat app called ChutUp with responsive styling done purely in CSS, no external libraries. The state management on this website is handled with Redux Toolkit. All data is fetched from an Express Node.js server. The chat in this app is created using SocketIO.</p>
                <p className="infoParagraph">If you wish to see more of my work, feel free to contact me.</p>
                <h2 className="infoHeader">Contact Info</h2>
                <a target="_blank" className="externalAnchor" href="https://www.filipslunsky.com/">My Portfolio</a>
                <a target="_blank" className="externalAnchor" href="https://github.com/filipslunsky">My GitHub</a>
                <a target="_blank" className="externalAnchor" href="https://www.linkedin.com/in/filipslunsky/">Connect with me on my LinkedIn</a>
                <hr />
                <a target="_blank" className="externalAnchor" href="https://github.com/filipslunsky/ChatApp">GitHub Repository for ChutUp</a>
            </div>
        </>
    );
}
 
export default About;