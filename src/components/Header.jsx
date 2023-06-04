import React from "react";
import logo_blanco from "../imagenes/logo_blanco.png";
import "../style/index.css";
import "../style/header.css"

const Header = () => {
  return (
    <div className="showcase">
      <div className="container showcase-inner">
        <img src={logo_blanco} alt="Logo" className="logo" />
        <div>
        <h1 className="title">a solas</h1>
          <h2 className="subtitle">Sexshop</h2>
          <p className="slogan">Te animas a jugar!?</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
