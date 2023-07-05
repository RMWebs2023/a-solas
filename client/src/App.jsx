import "./App.css";
import Landing from "./pages/Landing";
import Home from "./pages/Home.jsx";
import Pay from "./pages/Pay";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pagos" element={<Pay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
