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
            <h1>Datos del comprador</h1>
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
                <input placeholder="Codigo de area + N° sin 0 ni 15" />
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
              <textarea value="Dpto x - Llamar al X al llegar a la puerta - Entre calles x y x"/>
            </div>
            
            <button onClick={() => setSteps("secondStep")}>Siguiente</button>
          </div>
        ) : null}
        {steps === "secondStep" ? (
          <div>
            <h1>Datos de facturación</h1>
            <div>
              <label>DNI o CUIT</label>
              <input></input>
              <label>Condición frente a IVA</label>
              <input></input>
              <label>Domicilio</label>
              <input></input>
              <textarea />
            </div>
            <button onClick={() => setSteps("firstStep")}>Anterior</button>
            <button
              onClick={() => {
                setSteps("thirdStep");
                createPreference();
              }}
            >
              Siguiente
            </button>
          </div>
        ) : null}
        {steps === "thirdStep" ? (
          <div>
            <h1>Medios de pago</h1>
            <h3>Transferencia</h3>
            <p>Datos de la transferencia</p>
            <br />
            <h3>MercadoPago</h3>
            <Wallet initialization={{ preferenceId }} />
            <button onClick={() => setSteps("secondStep")}>Anterior</button>
          </div>
        ) : null}
      </form>
      <div>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto voluptas perspiciatis neque ea nostrum, deleniti minus beatae culpa accusantium nesciunt. Recusandae eligendi eum, nihil distinctio dignissimos nisi aliquam ad necessitatibus?</p>
      </div>
    </div>
  );
};

export default Buyer;
