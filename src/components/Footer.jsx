import "../assets/styles/footer.css";
import logo from "../assets/images/fetch6.png";

export default function Footer() {
    return (
        <div className="footer-body">
            <div className="footer-left">
                <div className="footer-title">
                    <img className="logo" src={logo} />
                </div>
                <div className="footer-copyright">
                    <h4>© 2024 Fetch Finance. All rights reserved.</h4>
                </div>
            </div>

            <div className="footer-contact">
                <h2>Contact</h2>

                <div className="links">
                    <a className="github-link" href="https://github.com/jlee927">Github</a>
                    <a className="linkedin-link" href="https://www.linkedin.com/in/jin-kyo-lee/">LinkedIn</a>
                    <a className="gmail-link" href="jklee882@gmail.com">Gmail</a>
                </div>
            </div>
        </div>


    )
}
