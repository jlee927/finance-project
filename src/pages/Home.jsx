import "../assets/styles/home.css";
import controlFinances from "../assets/images/control.png"
import visualizeFinances from "../assets/images/visualize.png"
import savingsFinances from "../assets/images/savemore.png"
import { Link } from "react-router-dom";


export default function Home() {
   const user = JSON.parse(localStorage.getItem("user"))

   if (user != null) {
      console.log(user)
   } else {
      console.log("user does not exist")
   }

   return (
      user ?
         <div>
            <main className="main--content">
               <div className="image--container">
                  <div className="message--container">
                     <h1>Welcome Back <br />{user.email}</h1>
                     <div className="btn--container">
                        <Link to="/dashboard">
                           <button>Go to Dashboard</button>
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="home--info">
                  <div>
                     <h3>Take Control of Your Finances</h3>
                     <img className="control--icon" src={controlFinances} />
                  </div>
                  <div>
                     <h3>Visualize Your Spending Trends</h3>
                     <img className="control--icon" src={visualizeFinances} />
                  </div>
                  <div>
                     <h3>Save More and Stress Less</h3>
                     <img className="control--icon" src={savingsFinances} />
                  </div>
               </div>

               <div style={{ margin: "12em 0 0 0", border: "solid white 1px" }} />
            </main>
         </div> :
         <div>
            <main className="main--content">
               <div className="image--container">
                  <div className="message--container">
                     <h1>Welcome to your <br />Finance Tool</h1>
                     <div className="btn--container">
                        <Link to="/signup">
                           <button>Get Started!</button>
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="home--info">
                  <div>
                     <h3>Take Control of Your Finances</h3>
                     <img className="control--icon" src={controlFinances} />
                  </div>
                  <div>
                     <h3>Visualize Your Spending Trends</h3>
                     <img className="control--icon" src={visualizeFinances} />
                  </div>
                  <div>
                     <h3>Save More and Stress Less</h3>
                     <img className="control--icon" src={savingsFinances} />
                  </div>
               </div>

               <div style={{ margin: "12em 0 0 0", border: "solid white 1px" }} />
            </main>
         </div>
   );
}
