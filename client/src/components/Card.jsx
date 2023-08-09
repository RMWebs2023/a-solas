import React from "react";
import { Link } from "react-router-dom";
import "../style/cards.css";

const Card = ({
  products,
  allProducts,
  setAllProducts,
  total,
  setTotal,
  countProducts,
  setCountProducts,
  createPreference
}) => {
  // función para agregar al carrito
  const addProduct = (product) => {
    if (allProducts.find((item) => item._id === product._id)) {
      const products = allProducts.map((item) =>
        item._id === product._id ? { ...item, quanty: item.quanty + 1 } : item
      );
      setTotal(total + product.price * product.quanty);
      setCountProducts(countProducts + product.quanty);
      return setAllProducts([...products]);
    }
    setTotal(total + product.price * product.quanty);
    setCountProducts(countProducts + product.quanty);
    setAllProducts([...allProducts, product]);
  };

  return (
    <>
      <div className="cards">
        {products.map((product, id) => (
          <div key={id} className="cards_productos" id="producto">
            <div className="container_cards wrapper">
              <Link to={`/${product.name}`}>
                <img
                  className="banner-image"
                  src={product.image}
                  alt="imagen de producto"
                />
              </Link>
              <h2 className="titulos">{product.name}</h2>
              <p className="texto_descripcion">{product.description}</p>
              <button className="boton" onClick={() => {
                addProduct(product)
                createPreference()
              }}>
                Agregar al carrito
              </button>
              <span className="precio">AR${product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
