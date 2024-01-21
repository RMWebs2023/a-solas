import React, { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import "../style/buyer.css"

initMercadoPago("TEST-c642f671-50cd-4061-9a9d-629c0cf079b4");

const Buyer = () => {
  const [steps, setSteps] = useState("firstStep");
  const [preferenceId, setPreferenceId] = useState("");

  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);

  // función que crea el ID que recibe MercadoPago
  const createPreference = async () => {
    try {
      const response = await axios.post("/create_preference", {
        description: cart[0].name,
        price: cart[0].price,
        quantity: cart[0].quanty,
      });
      setPreferenceId(response.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="buyer-body">
      <form className="buyer-landing">
        {steps === "firstStep" ? (
          <div className="buyer-form">

            <h1 >Datos del comprador</h1>

            <div className="comprador-ppal">
              <div className="identidad">
                <label>Nombre: </label>
                <input placeholder="Nombre"></input>
              </div>
              <div className="identidad">
                <label>Apellido: </label>
                <input placeholder="Apellido"></input>
              </div>
              <div className="identidad">
                <label>Documento: </label>
                <select id="Tipo" name="Tipo">
                  <option placeholder="DNI">DNI</option>
                  <option placeholder="Pasaporte">Pasaporte</option>
                </select>
                <input placeholder="N° de ID"></input>
              </div>
            </div>
  
            <div className="comprador-contacto">
              <div className="identidad">
                <label>Correo electrónico: </label>
                <input placeholder="Email"></input>
              </div>
              <div className="identidad">
                <label>Teléfono: </label>
                <input className="telefono" placeholder="( Cod ) + N° sin 0 ni 15" />
              </div>
            </div>

            <div className="comprador-adress">
              <label>Calle y altura: </label>
              <input placeholder="Domicilio de entrega, Altura y N° de Dpto o casa"></input>
            </div>
            
            <div className="comprador-ubi">
              <div>
                <label>Provincia: </label>
                <input placeholder="Provincia"></input>
              </div>
              <div>
                <label>Localidad: </label>
                <input placeholder="Localidad"></input>
              </div>
              <div>
                <label>Código Postal: </label>
                <input placeholder="CP"></input>
              </div>
            </div>
            
            <div className="comprador-final">
              <label>Comentarios: </label>
              <textarea placeholder="Dpto x - Llamar al X al llegar a la puerta - Entre calles x y x"/>
            </div>
            
            <button className="boton" onClick={() => {setSteps("secondStep")
          createPreference();}}>Siguiente</button>
          </div>
        ) : null}
        {steps === "secondStep" ? (
          <div className="buyer-form">
            
            <h1>Datos de facturación</h1>
            
            <div>

              <div className="empresa">
                <div className="condicion-iva">
                  <label>Condicion frente al IVA: </label>
                  <select id="Tipo" name="Tipo">
                    <option placeholder="Consumidor final">Consumidor final</option>
                    <option placeholder="Resp. Inscripto">Resp. Inscripto</option>
                    <option placeholder="Monotributista">Monotributista</option>
                    <option placeholder="Exento">Exento</option>
                  </select>
                </div>

                <div className="identidad">
                  <label>CUIT o CUIL: </label>
                  <select id="Tipo" name="Tipo">
                    <option placeholder="DNI">DNI</option>
                    <option placeholder="CUIT">CUIT</option>
                    <option placeholder="CUIL">CUIL</option>
                  </select>
                  <input placeholder="N° de ID"></input>
                </div>
              </div>
            
              <div className="RazonSocial">
                <label>Razon social: </label>
                <input placeholder="Razon Social"></input>
              </div>

              <div className="comprador-adress">
                <label>Calle y altura: </label>
                <input placeholder="Domicilio"></input>
              </div>

            </div>

            <div className="botones">
              <button className="boton" onClick={() => setSteps("firstStep")}>Anterior</button>
              <button className="boton" onClick={() => {setSteps("thirdStep");}}>Siguiente</button>
            </div>
          </div>
        ) : null}
        {steps === "thirdStep" ? (
          <div className="buyer-form">

            <h1>Medios de pago</h1>

            <div>
              <h2>Transferencia</h2>
              <p>Datos de la transferencia</p>
              <p>Banco X</p>
              <p>CBU: 123456789132456789</p>
              <p>Alias: test.configuracion</p>
              <p>La compra sera confirmada a los datos de contactos provistos al recibir el comprobante de transferencia. <br /> Los cuales deben ser enviados a ventas@asolas.com.ar o escribiendo al siguiente numero de wsp.</p>
            </div>
            <br />
            <div>
              <h2>MercadoPago</h2>
              <Wallet initialization={{ preferenceId }} />
             
            </div>
            
            <button className="boton" onClick={() => setSteps("secondStep")}>Anterior</button>
          </div>
        ) : null}
      </form>
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id repellat tenetur iste pariatur modi voluptatem culpa, voluptatum exercitationem quibusdam fugiat aliquam at numquam autem eaque! Explicabo pariatur consectetur quas ad?</p>
      </div>
    </div>
  );
};


export default Buyer;
