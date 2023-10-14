import React, { useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import carro from "../imagenes/carro.png";
import tachito from "../imagenes/tachito_blanco.png";
import "../style/cart.css";

initMercadoPago("TEST-c642f671-50cd-4061-9a9d-629c0cf079b4");

const Cart = ({
  allProducts,
  setAllProducts,
  total,
  setTotal,
  countProducts,
  setCountProducts,
}) => {
  const [show, setShow] = useState(false);
  const [preferenceId, setPreferenceId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // función que crea el ID que recibe MercadoPago
  const createPreference = async () => {
    try {
      const response = await axios.post("/create_preference", {
        description: allProducts[0].name,
        price: allProducts[0].price,
        quantity: allProducts[0].quanty,
      });
      setPreferenceId(response.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  // función para incrementar la cantidad del producto
  const addQuantity = (product) => {
    const productFilter = allProducts.find((item) => item._id === product._id);
    if (productFilter) {
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
    }
    if (productFilter && productFilter.quanty === 1) {
      const result = allProducts.filter((item) => item._id !== product._id);
      setTotal(total - product.price * product.quanty);
      setCountProducts(countProducts - product.quanty);
      setAllProducts(result);
    }
  };

  // función para eliminar un producto del carrito
  const deleteProduct = (product) => {
    const results = allProducts.filter((item) => item._id !== product._id);

    setTotal(total - product.price * product.quanty);
    setCountProducts(countProducts - product.quanty);
    setAllProducts(results);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          handleShow();
          createPreference();
        }}
        className="cartButton"
      >
        <img src={carro} alt="" className="carro_icon" />
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tu carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            {allProducts.length > 0 ? (
              allProducts.map((product, id) => (
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
                        <span>Subtotal: {product.subTotal} </span>
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
              <p>El carrito está vacío</p>
            )}
            <div>Total de productos: {countProducts}</div>
            <div>${total}</div>
            <Wallet initialization={{ preferenceId }} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
