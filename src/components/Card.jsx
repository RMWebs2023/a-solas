import React from "react";
import "../style/cards.css";

const Card = ({
  products,
  allProducts,
  setAllProducts,
  total,
  setTotal,
  countProducts,
  setCountProducts,
}) => { 
  // función para agregar productos al carrito
  const addProduct = (product) => {
    if (allProducts.find((item) => item._id === product._id)) {
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
  };

  return (
    <>
      <div className="cards">
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
