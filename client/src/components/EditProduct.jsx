import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { putProduct } from "../redux/action";
import { deleteProducts } from "../redux/action";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../style/filtro.css";

const EditProduct = ({ product }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [flavors, setFlavors] = useState("");

  const inputName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const inputPrice = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };

  const inputCategory = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const inputSubcategory = (e) => {
    e.preventDefault();
    setSubcategory(e.target.value);
  };

  const inputDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const inputImage = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const inputQuantity = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  const inputSize = (e) => {
    e.preventDefault();
    setSize(e.target.value);
  };

  const inputColor = (e) => {
    e.preventDefault();
    setColor(e.target.value);
  };

  const inputFlavors = (e) => {
    e.preventDefault();
    setFlavors(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("quantity", quantity);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("flavors", flavors);
    dispatch(putProduct(product._id, formData));
    setName("");
    setPrice("");
    setCategory("");
    setSubcategory("");
    setDescription("");
    setImage("");
    setQuantity("");
    setSize("");
    setColor("");
    setFlavors("");
    alert("Se ha modificado el producto");
    location.reload();
  };

  const deleteClick = (id) => {
    dispatch(deleteProducts(id));
    alert("Se ha eliminado el producto correctamente");
    location.reload();
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="editProd">
          <Container fluid>
            {/* Botón editar */}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
              Editar
            </Navbar.Toggle>

            <Navbar.Offcanvas
              className="offcanvas"
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton className="offcanvas-header">
                <Offcanvas.Title
                  className="offcanvas-title"
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                >
                  Editar producto
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="offcanvas-body">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* Formulario de edición de producto */}
                  <form
                    className="adm-form_add"
                    onSubmit={(e) => onSubmit(e)}
                    encType="multipart/form-data"
                  >
                    <label className="form-label">
                      {" "}
                      Nombre:
                      <input
                        placeholder={product.name}
                        value={name}
                        onChange={(e) => inputName(e)}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Precio:
                      <input
                        placeholder={product.price}
                        type="number"
                        value={price}
                        onChange={(e) => inputPrice(e)}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Categoría:
                      <input
                        placeholder={product.category}
                        value={category}
                        onChange={(e) => inputCategory(e)}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Subcategoría:
                      <input
                        placeholder={product.subcategory}
                        value={subcategory}
                        onChange={(e) => inputSubcategory(e)}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Descripción:
                      <input
                        placeholder={product.description}
                        value={description}
                        onChange={(e) => inputDescription(e)}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Imagen:
                      <input
                        placeholder={product.image}
                        type="file"
                        accept="image/*"
                        onChange={(e) => inputImage(e)}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Cantidad:
                      <input
                        placeholder={product.quantity}
                        type="number"
                        value={quantity}
                        onChange={(e) => inputQuantity(e)}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Talle:
                      <input
                        placeholder={product.size}
                        value={size}
                        onChange={(e) => inputSize(e)}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Color:
                      <input
                        placeholder={product.color}
                        value={color}
                        onChange={(e) => inputColor(e)}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Sabor:
                      <input
                        placeholder={product.flavors}
                        value={flavors}
                        onChange={(e) => inputFlavors(e)}
                      />
                    </label>
                  </form>

                  {/* Botón para editar */}
                  <footer className="footer-form">
                    <button
                      className="boton-form"
                      submit="submit"
                      onClick={(e) => onSubmit(e)}
                    >
                      Editar
                    </button>
                    {/* Botón para eliminar */}
                    <button
                      className="boton"
                      onClick={() => deleteClick(product._id)}
                    >
                      Eliminar
                    </button>
                  </footer>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default EditProduct;
