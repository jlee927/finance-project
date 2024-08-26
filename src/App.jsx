import AddEntry from "./pages/AddEntry";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
   return (
      <div>
         <BrowserRouter>
         <Navbar />
            <Routes>
               <Route path="/" element={<Home />}/>
               <Route path="/add_entry" element={<AddEntry />} /> 
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
