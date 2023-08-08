import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postProducts } from "../redux/action";
import "../style/admin.css";

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
        <div className="adm-add">
          <header>
            <h2 className="adm-add_title"> Agregar un producto </h2>
          </header>

          <form className="adm-form_add" onSubmit={(e) => onSubmit(e)}>
            <label className="form-label">
              {" "}
              Nombre:
              <input
                placeholder="Por ejemplo: vibrador de silicona..."
                value={name}
                onChange={(e) => inputName(e)}
              />
            </label>
            <label className="form-label">
              {" "}
              Precio:
              <input value={price} onChange={(e) => inputPrice(e)} />
            </label>
            <label className="form-label">
              {" "}
              Categoría:
              <input
                placeholder="Por ejemplo: Vibrador"
                value={category}
                onChange={(e) => inputCategory(e)}
              />
            </label>
            <label className="form-label">
              {" "}
              Subcategoría:
              <input
                placeholder="Por ejemplo: silicona"
                value={subcategory}
                onChange={(e) => inputSubcategory(e)}
              />
            </label>
            <label className="form-label">
              {" "}
              Detalle:
              <input
                placeholder="Detalle"
                value={details}
                onChange={(e) => inputDetails(e)}
              />
            </label>
            <label className="form-label">
              {" "}
              Descripción:
              <input
                placeholder="Descripcion del producto"
                value={description}
                onChange={(e) => inputDescription(e)}
              />
            </label>
            <label className="form-label">
              {" "}
              Imagen:
              <input
                placeholder="Insertar imagen del producto"
                value={image}
                onChange={(e) => inputImage(e)}
              />
            </label>
            <label className="form-label">
              {" "}
              Cantidad:
              <input value={quantity} onChange={(e) => inputQuantity(e)} />
            </label>
          </form>

          <footer className="footer-form">
            <button
              className="boton-form"
              submit="submit"
              onClick={(e) => onSubmit(e)}
            >
              Crear
            </button>
            <button
              className="boton"
              onClick={() => {
                close();
              }}
            >
              Cancelar creación
            </button>
          </footer>
        </div>
      ) : null}
    </>
  );
};
export default Modal;
