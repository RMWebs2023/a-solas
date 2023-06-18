import React from "react";
import "../style/cards.css";

const Card = ({ products }) => {
  return (
    <>
      <div className="cards">
        {products.map((product, id) => (
          <div key={id} className="cards_productos" id="producto">
            <div className="container_cards wrapper">
              <img
                className="banner-image"
                src={product.image}
                alt="imagen de producto"
              />
              <h2 className="titulos">{product.name}</h2>
              <p className="texto_descripcion">{product.description}</p>
              <span className="precio">AR${product.price}</span>
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default Card;
