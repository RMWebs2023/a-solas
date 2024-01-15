import React, { useState } from "react";
import { useNavigate } from "react-router";
import logo_blanco from "../imagenes/logo_blanco.png";
import "../style/landing.css";
import "../style/login.css"

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
      <div className="body">
        <div class="background">
          <div class="shape"></div>
          <div class="shape"></div>
        </div>

        <form className="form-login" onSubmit={handleSubmit}>

          <img src={logo_blanco} alt="Logo" className="logo_login" />

          <h3>Iniciar sesión</h3>

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
          <button type="submit" className="boton" >Login</button>
        </form>

      </div>
    </>
  );
};

export default Login;
