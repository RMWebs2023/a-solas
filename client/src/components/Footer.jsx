import React from "react";
import logo_blanco from "../imagenes/logo_blanco.png";
import wsp from "../imagenes/logos/wsp.png";
import insta from "../imagenes/logos/insta.png";
import tiktok from "../imagenes/logos/tiktok.png";
import "../style/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="asolas">
        <div className="info">
          <h1 className="title_footer">a solas</h1>
          <h2 className="subtitle_footer">Sexshop</h2>
          <span>
            <img src={wsp} alt="logo wsp" className="wsp" />
            Whatsapp:{" "}
            <a
              href="https://api.whatsapp.com/send?phone=5492615618566"
              className="url_wsp"
            >
              +54 9 261 561-8566
            </a>
          </span>
        </div>
        <div className="cont_logo">
          <img src={logo_blanco} alt="Logo" className="logo_footer" />
        </div>
        <div className="redes">
          <a href="https://www.instagram.com/asolassexshop/">
            <img src={insta} alt="logo instagram" className="insta" />
          </a>
          <a href="https://api.whatsapp.com/send?phone=5492615618566">
            <img src={wsp} alt="logo wsp" className="wsp_2" />
          </a>
          <a href="">
            <img src={tiktok} alt="logo tiktok" className="tiktok" />
          </a>
        </div>
      </div>
      <div className="RMWebs">
        <p>
          Powered <strong>By RMWebs®</strong> - 2023
        </p>
      </div>
    </footer>
  );
};

export default Footer;
