import "../assets/styles/navbar.css";
import logo from "../assets/images/fetch6.png";
import profilePic from "../assets/images/profile-pic.webp";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

// import logo from "../assets/images/logo.jpg";

export default function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const handleClick = () => {
        logout()
    }

    return (
        <div className="navbar--container">
            <div className="left--container">
                <NavLink to="/">
                    <img className="logo" src={logo} />
                </NavLink>
                {/* <NavLink to="/" className="title">Fetch Finance</NavLink> */}
            </div>
            {user && (
                <div className="right--container">
                    <NavLink to="/add_entry">
                        <div className="add--entry">Add Entry</div>
                    </NavLink>

                    <div className="dropdown">
                        <img className="profile--img" src={profilePic} />
                        {/* <span>{user.email}</span> */}
                        <div className="dropdown--content">
                            <button onClick={handleClick}>Log out</button>
                            <NavLink className="revenues--nav" to="/revenue">
                                <div>Revenues</div>
                            </NavLink>
                            <NavLink className="expenses--nav" to="/expenses">
                                <div>Expenses</div>
                            </NavLink>
                            <NavLink className="savings--nav" to="/savings">
                                <div>Savings</div>
                            </NavLink>
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
