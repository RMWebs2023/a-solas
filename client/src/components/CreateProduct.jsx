import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postProducts } from "../redux/action";

const Modal = ({ show, close }) => {
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
    const product = {
      name,
      price,
      category,
      subcategory,
      details,
      description,
      image,
      quantity,
    };
    dispatch(postProducts(product));
    setName("");
    setPrice(0);
    setCategory("");
    setSubcategory("");
    setDetails("");
    setDescription("");
    setImage("");
    setQuantity(0);
    alert("Se ha creado el producto");
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
                <input value={name} onChange={(e) => inputName(e)} />
              </label>
              <label>
                Precio:
                <input value={price} onChange={(e) => inputPrice(e)} />
              </label>
              <label>
                Categoría:
                <input value={category} onChange={(e) => inputCategory(e)} />
              </label>
              <label>
                Subcategoría:
                <input
                  value={subcategory}
                  onChange={(e) => inputSubcategory(e)}
                />
              </label>
              <label>
                Detalle:
                <input value={details} onChange={(e) => inputDetails(e)} />
              </label>
              <label>
                Descripción:
                <input
                  value={description}
                  onChange={(e) => inputDescription(e)}
                />
              </label>
              <label>
                Imagen:
                <input value={image} onChange={(e) => inputImage(e)} />
              </label>
              <label>
                Cantidad:
                <input value={quantity} onChange={(e) => inputQuantity(e)} />
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
export default Modal;
