import "./assets/styles/home.css";
import AddEntry from "./pages/AddEntry";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Revenue from "./pages/Revenue";
import Savings from "./pages/Savings";
import Sidebar from "./components/Sidebar";
import Signup from "./pages/Signup";
import Spendings from "./pages/Spendings";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>

            <Navbar />
            <main>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/add_entry" element={<AddEntry />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/revenue" element={<Revenue />} />
                        <Route path="/expenses" element={<Expenses />} />
                        <Route path="/savings" element={<Savings />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/spendings" element={<Spendings />} />
                    </Routes>
                </div>
            </main>
            <Footer />

        </BrowserRouter>
    )
}

export default App
