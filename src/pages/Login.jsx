import React, { useState } from "react";
import { useNavigate } from "react-router";
import logo_blanco from "../imagenes/logo_blanco.png";
import "../style/landing.css";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleUser = (e) => {
    e.preventDefault;
    setUser(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault;
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    if (user === "yeye@asolas.com" && password === "yeye") {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("password", JSON.stringify(password));
      alert("Inicio de sesión correcto");
      navigate("/admin");
    } else {
      alert("Usuario o contraseña incorrecta");
    }
  };

  return (
    <>
      <img src={logo_blanco} alt="Logo" className="logo_landing" />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Usuario"
          value={user}
          onChange={handleUser}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </>
  );
};

export default Login;
