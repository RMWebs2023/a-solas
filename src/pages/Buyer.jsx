import React, { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

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
    <>
      <form>
        {steps === "firstStep" ? (
          <div>
            <h1>Datos del comprador</h1>
            <label>Nombre</label>
            <input></input>
            <label>Apellido</label>
            <input></input>
            <label>Correo electrónico</label>
            <input></input>
            <label>Teléfono</label>
            <input></input>
            <label>Calle y altura</label>
            <input></input>
            <label>Provincia</label>
            <input></input>
            <label>Localidad</label>
            <input></input>
            <label>Código Postal</label>
            <input></input>
            <label>Comentarios</label>
            <textarea />
            <button onClick={() => setSteps("secondStep")}>Siguiente</button>
          </div>
        ) : null}
        {steps === "secondStep" ? (
          <div>
            <h1>Datos de facturación</h1>
            <label>DNI o CUIT</label>
            <input></input>
            <label>Condición frente a IVA</label>
            <input></input>
            <label>Domicilio</label>
            <input></input>
            <textarea />
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
    </>
  );
};

export default Buyer;
