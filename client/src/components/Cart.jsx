import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

const Cart = ({
  allProducts,
  setAllProducts,
  total,
  setTotal,
  countProducts,
  setCountProducts,
  count,
  setCount,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // función para incrementar la cantidad
  const addQuantity = (product) => {
    const f = allProducts.find((item) => item._id === product._id);
    if (f.quantity > 0 && count < f.quantity) {
      setCount(count + 1);
      setTotal(total + f.price);
      setCountProducts(countProducts + 1);
    }
  };

  // función para restar la cantidad
  const restQuantity = (product) => {
    const f = allProducts.find((item) => item._id === product._id);
    if (count > 0) {
      setCount(count - 1);
      setTotal(total - f.price);
      setCountProducts(countProducts - 1);
    }
  };

  // función para eliminar un producto del carrito
  const deleteProduct = (product) => {
    const results = allProducts.filter((item) => item._id !== product._id);

    setTotal(total - product.price * count);
    setCountProducts(countProducts - count);
    setAllProducts(results);
  };

  const emptyCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        Cart
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
                  <div>
                    <img src={product.image} alt="imagen de producto" />
                    <h2>{product.name}</h2>
                    <button onClick={() => addQuantity(product)}>+</button>
                    <div>{count}</div>
                    <button onClick={() => restQuantity(product)}>-</button>
                    <span>AR${product.price}</span>
                    <button onClick={() => deleteProduct(product)}>
                      Tachito
                    </button>
                    <button onClick={emptyCart}>Vaciar carrito</button>
                  </div>
                </div>
              ))
            ) : (
              <p>El carrito está vacío</p>
            )}
            <div>Total de productos: {countProducts}</div>
            <div>${total}</div>
            <Link to="/pagos">
              <button disabled={!allProducts.length > 0}>Ir a pagar</button>
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
