import React from "react";
import Swal from "sweetalert2";
import "../style/cards.css";

const Card = ({
  products,
  allProducts,
  setAllProducts,
  total,
  setTotal,
  countProducts,
  setCountProducts,
  targetRef,
}) => {
  // función para agregar productos al carrito
  const addProduct = (product) => {
    const productFilter = allProducts.find((item) => item._id === product._id);
    if (productFilter && productFilter.quantity > productFilter.quanty) {
      const products = allProducts.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quanty: item.quanty + 1,
              subTotal: item.subTotal + item.price,
            }
          : item
      );
      setTotal(total + product.price * product.quanty);
      setCountProducts(countProducts + product.quanty);
      const cart = allProducts;
      localStorage.setItem("cart", JSON.stringify(cart));
      return setAllProducts([...products]);
    }
    product.quanty = 1;
    product.subTotal = product.price;
    setTotal(total + product.price * product.quanty);
    setCountProducts(countProducts + product.quanty);
    setAllProducts([...allProducts, product]);
    const cart = allProducts;
    localStorage.setItem("cart", JSON.stringify(cart));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Se agregó tu producto al carrito",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <>
      <div className="cards" ref={targetRef}>
        {products.map((product, id) => (
          <div key={id} className="cards_productos" id="producto">
            <div className="container_cards wrapper">
              <img
                className="banner-image"
                src={product.image.secure_url}
                alt="imagen de producto"
              />
              <h2 className="titulos">{product.name}</h2>
              <p className="texto_descripcion">{product.description}</p>
              <div className="color">
                <p className="color-title">Color: </p>
                <button
                  className="color-button"
                  style={{ backgroundColor: product.color }}
                />
              </div>
              <p className="precio">AR${product.price}</p>
              <button
                disabled={!product.quantity}
                className="boton"
                onClick={() => {
                  addProduct(product);
                }}
              >
                Agregar al carrito
              </button>
              {product.quantity < 1 ? <>"Sin stock"</> : <></>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
