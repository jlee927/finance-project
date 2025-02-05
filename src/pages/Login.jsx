import "../assets/styles/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { login, error, isLoading } = useLogin();
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();

      await login(email, password);

      try {
         const user = JSON.parse(localStorage.getItem("user"))
         if (user.email == null) {
            console.log("no login info")
         } else {
            navigate("/")
         }
      }
      catch (err) {
         // catch error but not really an error when user.email is null so do nothing
         // just output error from login hook
         console.log(error)
      }
   };

   return (
      <div className="body">
         <div className="login-body">
            <form className="login" onSubmit={handleSubmit}>
               <h1>Log In </h1>
               <label>Email:</label>
               <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
               />

               <label>Password:</label>
               <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
               />
               <button disabled={isLoading}>Log in</button>
               {error && <div className="error">{error}</div>}
            </form>
         </div>
      </div>
   );
}
