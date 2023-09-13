import React from "react";
import "../style/comercial.css";
import camionEnvios from "../imagenes/camion_envios.png";
import mediosDePago from "../imagenes/mediosdepago-negro.png";
import wspNegro from "../imagenes/logos/wsp_negro.png";

const Comercial = () => {
  return (
    <main>
      <div className="back-2parte">

        <div className="comercial">
          <div className="comercial_card">
            <img src={camionEnvios} alt="" />
            <h3>Envios a todo el pais</h3>
          </div>
          <p>Envios con X empresa - a cargo del comprador</p>
        </div>

        <div className="comercial">
          <div className="comercial_card">
            <img src={mediosDePago} alt="" className="pagos_img"/>
            <h3>Aceptamos tarjetas de débito y crédito</h3>
          </div>
          <p>Gestionados por Mercado Pago</p>
        </div>

        <div className="comercial">
          <div className="comercial_card">
            <div>
              <a href="https://api.whatsapp.com/send?phone=5492615618566" className="url_wsp" target="_blank">
              <img src={wspNegro} alt="" /></a>
            </div>
            <h3>Escribenos tu consulta</h3>
          </div>
          <p><a href="https://api.whatsapp.com/send?phone=5492615618566" className="url_wsp" target="_blank">+54 9 261 561-8566</a></p>
        </div>

      </div>
    </main>
  );
};

export default Comercial;
