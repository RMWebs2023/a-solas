import "./App.css";
import Admin from "./pages/Admin";
import Detail from "./pages/Detail"
import Home from "./pages/Home.jsx";
import Landing from "./pages/Landing";
import Pay from "./pages/Pay";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pagos/:id" element={<Pay />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
