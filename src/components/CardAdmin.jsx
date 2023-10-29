import React from "react";
import EditProduct from "./EditProduct";

const CardAdmin = ({ products }) => {
  return (
    <>
      {products.map((product, id) => (
        <div className="card_admin" key={id}>
          <div className="producto">
            <p>
              <b>Nombre del producto:</b>
              <br /> {product.name}
            </p>
            <p>
              <b>Precio:</b>
              <br /> {product.price}
            </p>
            <p>
              <b>Categoria:</b>
              <br /> {product.category}
            </p>
            <p>
              <b>Subcategoria:</b>
              <br /> {product.subcategory}
            </p>
            <p>
              <b>Descripcion:</b>
            </p>
            <p className="desc-prod-adm"> {product.description}</p>
            <p>
              <b>Imagen:</b>
              <br />
            </p>
            <div className="img-prod-adm">
              {product.image ? (
                <img
                  className="img-prod-card-adm"
                  src={product.image.secure_url}
                />
              ) : (
                <img className="img-prod-card-adm" src={product.image} />
              )}
            </div>
            <p>
              <b>Stock:</b>
              <br />
              {product.quantity}
            </p>

            <div className="edit-prod">
              <EditProduct product={product} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardAdmin;
