import "../assets/styles/navbar.css";
import logo from "../assets/images/fetch8.png";
import profilePic from "../assets/images/profile-pic.webp";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// import logo from "../assets/images/logo.jpg";

export default function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const [isActive, setIsActive] = useState(false)

    const navigate = useNavigate();
    const handleClick = () => {
        logout()
        navigate("/")
        window.location.reload();
    }

    const handleDropdown = () => {
        setIsActive(!isActive)
    }

    return (
        <div className="navbar--container">
            <div className="left--container">
                <NavLink to="/">
                    <img className="logo" src={logo} />
                    {/*<h1 className="nuna-test">Gina and Isaac's Fianace</h1>*/}
                </NavLink>
                {/* <NavLink to="/" className="title">Fetch Finance</NavLink> */}
            </div>
            {user && (
                <div className="right--container">
                    <NavLink to="/dashboard">
                        <div className="add--entry">Dashboard</div>
                    </NavLink>
                    <div className="dropdown" style={{ float: "right" }} onClick={handleDropdown}>
                        <img className="profile--img" src={profilePic} />
                        {/* <span>{user.email}</span> */}
                        <div className="dropdown--content" style={{ display: isActive ? 'block' : 'none' }}>
                            {/*<img className="profile--img" src={profilePic} />*/}
                            <button className="logout--button">Change Profile</button>
                            <button className="logout--button" onClick={handleClick}>Log out</button>

                            {/*<NavLink className="revenues--nav" to="/revenue">
                                <div>Revenues</div>
                            </NavLink>
                            <NavLink className="expenses--nav" to="/expenses">
                                <div>Expenses</div>
                            </NavLink>
                            <NavLink className="savings--nav" to="/savings">
                                <div>Savings</div>
                            </NavLink> */}
                        </div>
                    </div>
                </div>
            )}
            {!user && (
                <div className="account--containers">
                    <NavLink className="signup--nav" to="/signup">
                        <div>Signup </div>
                    </NavLink>

                    <NavLink className="login--nav" to="/login">
                        <div>Login</div>
                    </NavLink>
                </div>
            )}
        </div>
    )
}
