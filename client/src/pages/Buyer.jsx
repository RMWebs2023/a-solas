import React, { useState } from "react";
import { Link } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import "../style/buyer.css";
import "../style/cart.css";

initMercadoPago("APP_USR-3c275743-05fd-4300-af82-fdb01da26121");
// initMercadoPago("TEST-c642f671-50cd-4061-9a9d-629c0cf079b4");

const Buyer = () => {
  const [steps, setSteps] = useState("firstStep");
  const [preferenceId, setPreferenceId] = useState("");

  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);

  let total = localStorage.getItem("total");
  total = JSON.parse(total);

  let countProducts = localStorage.getItem("countProducts");
  countProducts = JSON.parse(countProducts);

  // función que crea el ID que recibe MercadoPago
  const createPreference = async () => {
    let mappingTitle = cart.map((p) => `${p.name} x${p.quanty}`);
    let products = mappingTitle.join(", ");
    try {
      const response = await axios.post("/create_preference", {
        description: products,
        price: total,
        quantity: countProducts,
      });
      setPreferenceId(response.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [typeDocument1, setTypeDocument1] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [comment, setComment] = useState("");
  const [iva, setIva] = useState("");
  const [typeDocument, setTypeDocument] = useState("");
  const [documentFact, setDocumentFact] = useState("");
  const [social, setSocial] = useState("");
  const [streetFact, setStreetFact] = useState("");

  const inputName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const inputLastName = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
  };

  const inputDocument = (e) => {
    e.preventDefault();
    setDocument(e.target.value);
  };

  const inputTypeDocument1 = (e) => {
    e.preventDefault();
    setTypeDocument1(e);
  };

  const inputEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const inputPhone = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
  };

  const inputStreet = (e) => {
    e.preventDefault();
    setStreet(e.target.value);
  };

  const inputProvince = (e) => {
    e.preventDefault();
    setProvince(e.target.value);
  };

  const inputCity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const inputPostal = (e) => {
    e.preventDefault();
    setPostal(e.target.value);
  };

  const inputComment = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const inputIva = (e) => {
    e.preventDefault();
    setIva(e.target.value);
  };

  const inputTypeDocument = (e) => {
    e.preventDefault();
    setTypeDocument(e.target.value);
  };

  const inputDocumentFact = (e) => {
    e.preventDefault();
    setDocumentFact(e.target.value);
  };

  const inputSocial = (e) => {
    e.preventDefault();
    setSocial(e.target.value);
  };

  const inputStreetFact = (e) => {
    e.preventDefault();
    setStreetFact(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      lastName,
      typeDocument1,
      document,
      email,
      phone,
      street,
      province,
      city,
      postal,
      comment,
      iva,
      typeDocument,
      documentFact,
      social,
      streetFact,
    };
    localStorage.setItem("data", JSON.stringify(data));
    setName("");
    setLastName("");
    setTypeDocument1("");
    setDocument("");
    setEmail("");
    setPhone("");
    setStreet("");
    setProvince("");
    setCity("");
    setPostal("");
    setComment("");
    setIva("");
    setTypeDocument("");
    setDocumentFact("");
    setSocial("");
    setStreetFact("");
  };

  let message = `Hola A Solas,

Te paso el resumen de mi pedido:
  
Detalles de la compra:
- Productos: 
- Cantidad total de productos: 
- Precio final: $

Datos del cliente:
- ${name} ${lastName}
- ${typeDocument1} ${document}
- ${email}
- ${phone}
- ${street}, ${city}, ${province}, CP ${postal}
  
Espero tu respuesta para poder realizar la transferencia y organizar el retiro/envío de mi pedido`;

  let whatsappURL = `https://wa.me/5492612708535/?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="buyer-body">
      <form className="buyer-landing">
        {steps === "firstStep" ? (
          <div className="buyer-form">
            <h1>Datos del comprador</h1>
            <div className="comprador-ppal">
              <div className="identidad">
                <label>Nombre: </label>
                <input
                  placeholder="Nombre"
                  onChange={(e) => inputName(e)}
                ></input>
              </div>
              <div className="identidad">
                <label>Apellido: </label>
                <input
                  placeholder="Apellido"
                  onChange={(e) => inputLastName(e)}
                ></input>
              </div>
              <div className="identidad">
                <label>Documento: </label>
                <select
                  id="Tipo"
                  name="Tipo"
                  onChange={(e) => inputTypeDocument1(e)}
                >
                  <option placeholder="DNI">DNI</option>
                  <option placeholder="Pasaporte">Pasaporte</option>
                </select>
                <input
                  placeholder="N° de ID"
                  onChange={(e) => inputDocument(e)}
                ></input>
              </div>
            </div>

            <div className="comprador-contacto">
              <div className="identidad">
                <label>Correo electrónico: </label>
                <input
                  placeholder="Email"
                  onChange={(e) => inputEmail(e)}
                ></input>
              </div>
              <div className="identidad">
                <label>Teléfono: </label>
                <input
                  className="telefono"
                  placeholder="( Cod ) + N° sin 0 ni 15"
                  onChange={(e) => inputPhone(e)}
                />
              </div>
            </div>

            <div className="comprador-adress">
              <label>Calle y altura: </label>
              <input
                placeholder="Domicilio de entrega, Altura y N° de Dpto o casa"
                onChange={(e) => inputStreet(e)}
              ></input>
            </div>

            <div className="comprador-ubi">
              <div>
                <label>Provincia: </label>
                <input
                  placeholder="Provincia"
                  onChange={(e) => inputProvince(e)}
                ></input>
              </div>
              <div>
                <label>Localidad: </label>
                <input
                  placeholder="Localidad"
                  onChange={(e) => inputCity(e)}
                ></input>
              </div>
              <div>
                <label>Código Postal: </label>
                <input
                  placeholder="CP"
                  onChange={(e) => inputPostal(e)}
                ></input>
              </div>
            </div>

            <div className="comprador-final">
              <label>Comentarios: </label>
              <textarea
                placeholder="Dpto x - Llamar al X al llegar a la puerta - Entre calles x y x"
                onChange={(e) => inputComment(e)}
              />
            </div>

            <button
              className="boton"
              onClick={() => {
                setSteps("secondStep");
                createPreference();
              }}
            >
              Siguiente
            </button>
          </div>
        ) : null}
        {steps === "secondStep" ? (
          <div className="buyer-form">
            <h1>Datos de facturación</h1>

            <div>
              <div className="empresa">
                <div className="condicion-iva">
                  <label>Condicion frente al IVA: </label>
                  <select id="Tipo" name="Tipo" onChange={(e) => inputIva(e)}>
                    <option placeholder="Consumidor final">
                      Consumidor final
                    </option>
                    <option placeholder="Resp. Inscripto">
                      Resp. Inscripto
                    </option>
                    <option placeholder="Monotributista">Monotributista</option>
                    <option placeholder="Exento">Exento</option>
                  </select>
                </div>

                <div className="identidad">
                  <label>CUIT o CUIL: </label>
                  <select
                    id="Tipo"
                    name="Tipo"
                    onChange={(e) => inputTypeDocument(e)}
                  >
                    <option placeholder="DNI">DNI</option>
                    <option placeholder="CUIT">CUIT</option>
                    <option placeholder="CUIL">CUIL</option>
                  </select>
                  <input
                    placeholder="N° de ID"
                    onChange={(e) => inputDocumentFact(e)}
                  ></input>
                </div>
              </div>

              <div className="RazonSocial">
                <label>Razon social: </label>
                <input
                  placeholder="Razon Social"
                  onChange={(e) => inputSocial(e)}
                ></input>
              </div>

              <div className="comprador-adress">
                <label>Calle y altura: </label>
                <input
                  placeholder="Domicilio"
                  onChange={(e) => inputStreetFact(e)}
                ></input>
              </div>
            </div>

            <div className="botones">
              <button className="boton" onClick={() => setSteps("firstStep")}>
                Anterior
              </button>
              <button
                className="boton"
                submit="submit"
                onClick={(e) => setSteps("thirdStep")}
              >
                Siguiente
              </button>
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
              {/* <p>
                La compra sera confirmada a los datos de contactos provistos al
                recibir el comprobante de transferencia. <br /> Los cuales deben
                ser enviados a ventas@asolas.com.ar o escribiendo al siguiente
                numero de wsp.
              </p> */}
            </div>
            <Link to={whatsappURL}>
              <button className="boton" onClick={(e) => onSubmit(e)}>
                Pagar por transferencia
              </button>
            </Link>
            <br />
            <div>
              <h2>MercadoPago</h2>
              {preferenceId ? (
                <Wallet initialization={{ preferenceId }} />
              ) : (
                <Spinner animation="border" role="status" className="loader">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </div>
            <button className="boton" onClick={() => setSteps("secondStep")}>
              Anterior
            </button>
          </div>
        ) : null}
      </form>
      <div>
        <div className="cartBuyer">
          {cart.map((product, id) => (
            <div key={id}>
              <div className="carro_body">
                <div className="carro_1ra">
                  <div className="carro-1ra_img">
                    <img
                      src={product.image.secure_url}
                      alt="imagen de producto"
                      className="img-carro"
                    />
                  </div>
                  <div className="carro-1ra_product">
                    <h2 className="carro-1ra_product__title">{product.name}</h2>
                    <span className="carro-1ra_product__price">
                      AR${product.price}
                    </span>
                  </div>
                  <div className="carro-1ra_subtotal">
                    <span>Subtotal: ${product.subTotal} </span>
                  </div>
                </div>
                <hr />
              </div>
              AR$ {total}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buyer;
