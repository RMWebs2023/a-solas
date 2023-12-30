import "./App.css";
import Admin from "./pages/Admin";
import Buyer from "./pages/Buyer";
import Home from "./pages/Home.jsx";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SendEmail from "./components/SendEmail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email" element={<SendEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
