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
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);

  return (
    <>
      <Button
        variant="primary"
        onClick={() => handleShow()}
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
              <p>El carrito está vacío</p>
            )}
            <div className="carro-2da-parte">
              <div>Total de productos: {countProducts}</div>
              <div>${total}</div>
              <button
                className="boton"
                disabled={cart.length === 0}
                onClick={() => navigate("/buyer")}
              >
                Ir a pagar
              </button>
            </div>
            
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
