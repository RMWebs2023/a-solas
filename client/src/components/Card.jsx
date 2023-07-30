import React from "react";
import "../style/cards.css";
import { Link } from "react-router-dom";

const Card = ({
  products,
  allProducts,
  setAllProducts,
  total,
  setTotal,
  countProducts,
  setCountProducts,
  count,
  setCount,
}) => {
  // función para agregar al carrito
  const addProduct = (product) => {
    if (allProducts.find((item) => item._id === product._id)) {
      const products = allProducts.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCount(count + 1);
      setTotal(total + product.price * count);
      setCountProducts(countProducts + 1);
      return setAllProducts([...products]);
    }
    setTotal(total + product.price * count);
    setCountProducts(countProducts + count);
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
              <p className="texto_descripcion">{product.description.slice(0,200)}...</p>
              <button className="boton" onClick={() => addProduct(product)}>
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
