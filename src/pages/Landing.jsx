import React from "react";
import { Link } from "react-router-dom";
import logo_blanco from "../imagenes/logo_blanco.png";
import "../style/landing.css";

const Landing = () => {
  return (
    <div className="landing">
      <h1 className="title_landing">a solas</h1>
      <h2 className="subtitle_landing">SEXSHOP</h2>
      <p className="slogan_landing">Para ingresar al sitio debes ser mayor de edad. <br /> Si tienes +18 años haz click aqui</p>
      <Link to="/home">
        <img src={logo_blanco} alt="Logo" className="logo_landing" />
      </Link>
  </div>
  );
};

export default Landing;
