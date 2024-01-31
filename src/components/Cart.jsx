import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import carro from "../imagenes/carro.png";
import tachito from "../imagenes/tachito_blanco.png";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import "../style/cart.css";

initMercadoPago("APP_USR-3c275743-05fd-4300-af82-fdb01da26121");
// initMercadoPago("TEST-c642f671-50cd-4061-9a9d-629c0cf079b4");

const Cart = ({
  allProducts,
  setAllProducts,
  total,
  setTotal,
  countProducts,
  setCountProducts,
}) => {
  // const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // promoción
  const [promo, setPromo] = useState("");
  const [promoValidated, setPromoValidated] = useState("");
  const [questionCode, setQuestionCode] = useState("");
  const [error, setError] = useState("");

  const promocode = (e) => {
    e.preventDefault();
    setPromo(e.target.value);
  };

  const percent = total * 0.2;

  const handlePromo = (e) => {
    e.preventDefault();
    setQuestionCode(e);
  };

  const validationPromo = (e) => {
    e.preventDefault();
    if (promo === "SANVALENTIN") {
      setPromoValidated(promo);
    } else {
      setError("Código inválido");
    }
    console.log(promoValidated);
  };

  // función para incrementar la cantidad del producto
  const addQuantity = (product) => {
    const productFilter = allProducts.find((item) => item._id === product._id);
    if (productFilter && productFilter.quantity > productFilter.quanty) {
      setAllProducts(
        allProducts.map((item) =>
          item._id === product._id
            ? {
                ...product,
                quanty: productFilter.quanty + 1,
                subTotal: productFilter.subTotal + productFilter.price,
              }
            : item
        )
      );
      setTotal(total + productFilter.price);
      setCountProducts(countProducts + 1);
      const cart = allProducts;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  // función para restar la cantidad del producto
  const restQuantity = (product) => {
    const productFilter = allProducts.find((item) => item._id === product._id);
    if (productFilter && productFilter.quanty > 0) {
      setAllProducts(
        allProducts.map((item) =>
          item._id === product._id
            ? {
                ...product,
                quanty: productFilter.quanty - 1,
                subTotal: productFilter.subTotal - productFilter.price,
              }
            : item
        )
      );
      setTotal(total - productFilter.price);
      setCountProducts(countProducts - 1);
      const cart = allProducts;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    if (productFilter && productFilter.quanty === 1) {
      const result = allProducts.filter((item) => item._id !== product._id);
      setTotal(total - product.price * product.quanty);
      setCountProducts(countProducts - product.quanty);
      setAllProducts(result);
      const cart = allProducts;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  // función para eliminar un producto del carrito
  const deleteProduct = (product) => {
    const results = allProducts.filter((item) => item._id !== product._id);

    setTotal(total - product.price * product.quanty);
    setCountProducts(countProducts - product.quanty);
    setAllProducts(results);
    const cart = allProducts;
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // let cart = localStorage.getItem("cart");
  // cart = JSON.parse(cart);

  // configuración de MercadoPago
  const [preferenceId, setPreferenceId] = useState("");

  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);

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
      console.log(response.data.id);
      setPreferenceId(response.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          createPreference();
          handleShow();
        }}
        className="cartButton"
      >
        <img src={carro} alt="" className="carro_icon" />
        <span className="numerito"> {countProducts} </span>
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton className="titulo-cart">
          <Offcanvas.Title>Tu carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            {cart.length > 0 ? (
              cart.map((product, id) => (
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
                        <h2 className="carro-1ra_product__title">
                          {product.name}
                        </h2>
                        <span className="carro-1ra_product__price">
                          AR${product.price}
                        </span>
                        <div className="carro-1ra_counter">
                          <button
                            className="boton_counter"
                            onClick={() => restQuantity(product)}
                          >
                            -
                          </button>
                          <span className="counter">{product.quanty}</span>
                          <button
                            className="boton_counter"
                            onClick={() => addQuantity(product)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="carro-1ra_subtotal">
                        <span>Subtotal: ${product.subTotal} </span>
                        <button
                          className="boton-counter_subtotal"
                          onClick={() => deleteProduct(product)}
                        >
                          <img src={tachito} alt="" className="img-tachito" />
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              ))
            ) : (
              <>
                <p>El carrito está vacío</p>
              </>
            )}
            <div className="carro-2da-parte">
              {questionCode ? (
                <>
                  <input
                    placeholder="Código promocional"
                    onChange={(e) => promocode(e)}
                  ></input>
                  <button className="boton" onClick={(e) => validationPromo(e)}>Validar</button>
                  {error ? <div>{error}</div> : ""}
                </>
              ) : (
                <a onClick={(e) => handlePromo(e)} className="hiper">
                  ¿Tienes código promocional?
                </a>
              )}
              <div>Total de productos: {countProducts}</div>
              {promoValidated === "SANVALENTIN" ? (
                <>
                  <div>-${percent}</div>
                  <div>${total - percent}</div>
                </>
              ) : (
                <div>${total}</div>
              )}
              {/* <button
                className="boton"
                disabled={cart.length === 0}
                onClick={() => navigate("/buyer")}
              >
                Finalizar compra
              </button> */}
              {preferenceId ? (
                <Wallet initialization={{ preferenceId }} />
              ) : (
                <Spinner animation="border" role="status" className="loader">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
