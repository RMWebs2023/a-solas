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
        <div className="adm-ed">
          <header>
            <h2 className="adm-add_title"> Edición del producto </h2>
          </header>

          <form className="adm-form_ed" onSubmit={(e) => onSubmit(e)}>
            <label className="form-label"> Nombre:
              <input value={name} onChange={(e) => inputName(e)} placeholder={product.name} />
            </label>
            <label className="form-label"> Precio:
              <input value={price} onChange={(e) => inputPrice(e)} placeholder={product.price} />
            </label>
            <label className="form-label"> Categoría:
              <input value={category} onChange={(e) => inputCategory(e)} placeholder={product.category} />
            </label>
            <label className="form-label"> Subcategoría:
              <input value={subcategory} onChange={(e) => inputSubcategory(e)} placeholder={product.subcategory} />
            </label>
            <label className="form-label"> Detalle:
              <input value={details} onChange={(e) => inputDetails(e)} placeholder={product.details} />
            </label>
            <label className="form-label"> Descripción:
              <input value={description} onChange={(e) => inputDescription(e)} placeholder={product.description} />
            </label>
            <label className="form-label"> Imagen:
              <input value={image} onChange={(e) => inputImage(e)} placeholder={product.image} />
            </label>
            <label className="form-label"> Cantidad:
              <input value={quantity} onChange={(e) => inputQuantity(e)} placeholder={product.quantity} />
            </label>
            
          </form>

          <footer className="footer-form">
            <button className="boton-form" submit="submit">Editar</button>
            <button className="boton" onClick={() => {
                close();
              }}
            >
              Cancelar edición
            </button>
            <button className="boton" onClick={() => deleteClick(product._id)}>Eliminar</button>
          </footer>
        </div>
      ) : null}
    </>
  );
};

export default EditProduct;
