import "./assets/styles/home.css";
import AddEntry from "./pages/AddEntry";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
   return (
      <div>
         <BrowserRouter className="main--home">
         <Navbar />
            <Routes>
               <Route path="/" element={<Home />}/>
               <Route path="/add_entry" element={<AddEntry />} /> 
               <Route path="/signup" element={<Signup />} />
               <Route path="/login" element={<Login />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
