import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import carro from "../imagenes/carro.png";
import tachito from "../imagenes/tachito_blanco.png";
import "../style/cart.css";

const Cart = ({
  allProducts,
  setAllProducts,
  total,
  setTotal,
  countProducts,
  setCountProducts,
}) => {
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);

  const navigate = useNavigate();
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

  let percent = total * 0.2;

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
      setPromoValidated("");
      setError("");
      setQuestionCode("");
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
    setPromoValidated("");
    setError("");
    setQuestionCode("");
    const cart = allProducts;
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => handleShow()}
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
                    className="inputPromo"
                    placeholder="Código promocional"
                    onChange={(e) => promocode(e)}
                  ></input>
                  <button className="boton" onClick={(e) => validationPromo(e)}>
                    Validar
                  </button>
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
              <button
                className="boton"
                disabled={cart.length === 0}
                onClick={() => navigate("/buyer")}
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
