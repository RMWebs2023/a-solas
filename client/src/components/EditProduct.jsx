import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { putProduct } from "../redux/action";

const EditProduct = ({ show, close, product }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [details, setDetails] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);

  const inputName = (e) => {
    e.preventDefault;
    setName(e.target.value);
  };

  const inputPrice = (e) => {
    e.preventDefault;
    setPrice(e.target.value);
  };

  const inputCategory = (e) => {
    e.preventDefault;
    setCategory(e.target.value);
  };

  const inputSubcategory = (e) => {
    e.preventDefault;
    setSubcategory(e.target.value);
  };

  const inputDetails = (e) => {
    e.preventDefault;
    setDetails(e.target.value);
  };

  const inputDescription = (e) => {
    e.preventDefault;
    setDescription(e.target.value);
  };

  const inputImage = (e) => {
    e.preventDefault;
    setImage(e.target.value);
  };

  const inputQuantity = (e) => {
    e.preventDefault;
    setQuantity(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      price,
      category,
      subcategory,
      details,
      description,
      image,
      quantity,
    };
    dispatch(putProduct(product._id, data));
    setName("");
    setPrice(0);
    setCategory("");
    setSubcategory("");
    setDetails("");
    setDescription("");
    setImage("");
    setQuantity(0);
    alert("Se ha modificado el producto");
    location.reload();
  };

  return (
    <>
      {show ? (
        <div>
          <div>
            <header>
              <h2> Agregar un producto </h2>
            </header>
            <form onSubmit={(e) => onSubmit(e)}>
              <label>
                Nombre:
                <input
                  value={name}
                  onChange={(e) => inputName(e)}
                  placeholder={product.name}
                />
              </label>
              <label>
                Precio:
                <input
                  value={price}
                  onChange={(e) => inputPrice(e)}
                  placeholder={product.price}
                />
              </label>
              <label>
                Categoría:
                <input
                  value={category}
                  onChange={(e) => inputCategory(e)}
                  placeholder={product.category}
                />
              </label>
              <label>
                Subcategoría:
                <input
                  value={subcategory}
                  onChange={(e) => inputSubcategory(e)}
                  placeholder={product.subcategory}
                />
              </label>
              <label>
                Detalle:
                <input
                  value={details}
                  onChange={(e) => inputDetails(e)}
                  placeholder={product.details}
                />
              </label>
              <label>
                Descripción:
                <input
                  value={description}
                  onChange={(e) => inputDescription(e)}
                  placeholder={product.description}
                />
              </label>
              <label>
                Imagen:
                <input
                  value={image}
                  onChange={(e) => inputImage(e)}
                  placeholder={product.image}
                />
              </label>
              <label>
                Cantidad:
                <input
                  value={quantity}
                  onChange={(e) => inputQuantity(e)}
                  placeholder={product.quantity}
                />
              </label>
              <button submit="submit">Submit</button>
            </form>
            <footer>
              <button
                onClick={() => {
                  close();
                }}
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditProduct;
