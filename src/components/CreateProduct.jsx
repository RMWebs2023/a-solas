import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postProducts } from "../redux/action";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../style/admin.css";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

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

  const inputDescription = (e) => {
    e.preventDefault;
    setDescription(e.target.value);
  };

  const inputImage = (e) => {
    e.preventDefault;
    setImage(e.target.files[0]);
  };

  const inputQuantity = (e) => {
    e.preventDefault;
    setQuantity(e.target.value);
  };

  const inputSize = (e) => {
    e.preventDefault;
    setSize(e.target.value);
  };

  const inputColor = (e) => {
    e.preventDefault;
    setColor(e.target.value);
  };

  const onSubmit = async (e) => {
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
    await dispatch(postProducts(formData));
    setName("");
    setPrice(0);
    setCategory("");
    setSubcategory("");
    setDetails("");
    setDescription("");
    setImage(null);
    setQuantity(0);
    setSize("");
    alert("Se ha creado el producto");
    location.reload();
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="crearProd">
          <Container fluid>
            {/* Botón crear producto */}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
              Crear producto
            </Navbar.Toggle>

            <Navbar.Offcanvas
              className="offcanvas"
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton className="offcanvas-header">
                <Offcanvas.Title
                  className="offcanvas-title"
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                >
                  Crear producto
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="offcanvas-body">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* Formulario de creación de producto */}
                  <form
                    className="adm-form_add"
                    onSubmit={(e) => onSubmit(e)}
                    encType="multipart/form-data"
                  >
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
                        type="file"
                        accept="image/*"
                        placeholder="Insertar imagen del producto"
                        onChange={(e) => inputImage(e)}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Cantidad:
                      <input
                        value={quantity}
                        onChange={(e) => inputQuantity(e)}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Talle:
                      <input value={size} onChange={(e) => inputSize(e)} />
                    </label>
                    <label className="form-label">
                      {" "}
                      Color:
                      <input value={color} onChange={(e) => inputColor(e)} />
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
export default CreateProduct;
