import "../assets/styles/navbar.css";
import dogLogo from "../assets/images/dog-logo.jpg";
import homeLogo from "../assets/images/home-logo2.png";
import profilePic from "../assets/images/profile-pic.webp";
import { NavLink } from "react-router-dom";

// import logo from "../assets/images/logo.jpg";

export default function Navbar() {
   return (
      <div className="navbar--container">
         <div className="left--container">
            <NavLink to="/">
               <img className="logo" src={dogLogo} />
            </NavLink>
            <NavLink to="/" className="title">Finance Fetch</NavLink>
         </div>

         <div className="right--container">
            <NavLink className="add--entry" to="/add_entry">
            <div className="entry--bubble">
               Add Entry
            </div>
            </NavLink>
            <img className="profile--img" src={profilePic} />
         </div>
      </div>
   );
}
