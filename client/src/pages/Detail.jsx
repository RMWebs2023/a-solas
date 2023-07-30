import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Detail = () => {
  const product = useParams();
  const products = useSelector((state) => state.products);

  const productDetail = products.filter((item) => item.name === product.id);

  return (
    <>
      <div>
        {productDetail.map((product, id) => (
          <div key={id} id="producto">
            <div>
              <img src={product.image} alt="imagen de producto" />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              {/* <button onClick={() => addProduct(product)}>
                Agregar al carrito
              </button> */}
              <span>AR${product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Detail;
