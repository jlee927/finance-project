import "../assets/styles/home.css";
import { Link } from "react-router-dom";

export default function Home() {
   return (
      <main className="main--content">
         <div className="image--container">
            <div className="message--container">
               <h1>Welcome to your Finance Tool</h1>
               <div className="btn--container">
                  <Link to="/add_entry">
                     <button>Get Started!</button>
                  </Link>
               </div>
            </div>
         </div>
      </main>
   );
}
