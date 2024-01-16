import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/action";
import { Link } from "react-router-dom";
import logo_blanco from "../imagenes/logo_blanco.png";
import "../style/landing.css";
import { GoArrowDown } from "react-icons/go";

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="landing">
      <h1 className="title_landing">A SolaS</h1>
      <h2 className="subtitle_landing">SEXSHOP</h2>
      <p className="slogan_landing">
        Para ingresar al sitio debes ser mayor de edad. <br /> Si tienes +18
        años haz click en el logo
      </p>
      <GoArrowDown className="flechita" />
      <Link to="/home">
        <img src={logo_blanco} alt="Logo" className="logo_landing" />
      </Link>
    </div>
  );
};

export default Landing;
