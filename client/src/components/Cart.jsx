import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import carro from "../imagenes/carro.png";
import tachito from "../imagenes/tachito_blanco.png";
import axios from "axios";
import "../style/cart.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

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
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createPreference = async () => {
    try {
      const response = await axios.post("/create_preference", {
        description: allProducts[0].name,
        price: allProducts[0].price,
        quantity: allProducts[0].quanty,
      });
      return response.data.id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    console.log(id)
    return id
    //   // navigate(`/pagos/${id}`);
  };

  // función para incrementar la cantidad
  const addQuantity = (product) => {
    const productFilter = allProducts.find((item) => item._id === product._id);
    if (productFilter) {
      setAllProducts(
        allProducts.map((item) =>
          item._id === product._id
            ? { ...product, quanty: productFilter.quanty + 1 }
            : item
        )
      );
      setSubTotal(productFilter.price + productFilter.price);
      setTotal(total + productFilter.price);
      setCountProducts(countProducts + 1);
    }
  };

  // función para restar la cantidad
  const restQuantity = (product) => {
    const productFilter = allProducts.find((item) => item._id === product._id);
    if (productFilter && productFilter.quanty > 0) {
      setAllProducts(
        allProducts.map((item) =>
          item._id === product._id
            ? { ...product, quanty: productFilter.quanty - 1 }
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
      <Button variant="primary" onClick={handleShow} className="cartButton">
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
                          src={product.image}
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
                        <span>Subtotal: {subTotal} </span>
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
            <Wallet initialization={{ preferenceId: handleBuy() }} />
            {/* <button
              onClick={() => handleBuy()}
              disabled={!allProducts.length > 0}
            >
              Ir a pagar
            </button> */}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
