import "./assets/styles/home.css";
import AddEntry from "./pages/AddEntry";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Revenue from "./pages/Revenue";
import Savings from "./pages/Savings";
import Signup from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <div>
            <BrowserRouter className="main--home">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add_entry" element={<AddEntry />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/revenue" element={<Revenue />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/savings" element={<Savings />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
