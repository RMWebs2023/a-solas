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
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [details, setDetails] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);

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

  const inputDetails = (e) => {
    e.preventDefault();
    setDetails(e.target.value);
  };

  const inputDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const inputImage = (e) => {
    e.preventDefault;
    setImage(e.target.value);
  };

  const inputQuantity = (e) => {
    e.preventDefault();
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
                  <form className="adm-form_ed">
                    <label className="form-label">
                      {" "}
                      Nombre:
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => inputName(e)}
                        placeholder={product.name}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Precio:
                      <input
                        value={price}
                        onChange={(e) => inputPrice(e)}
                        placeholder={product.price}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Categoría:
                      <input
                        value={category}
                        onChange={(e) => inputCategory(e)}
                        placeholder={product.category}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Subcategoría:
                      <input
                        value={subcategory}
                        onChange={(e) => inputSubcategory(e)}
                        placeholder={product.subcategory}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Detalle:
                      <input
                        value={details}
                        onChange={(e) => inputDetails(e)}
                        placeholder={product.details}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Descripción:
                      <textarea
                        value={description}
                        onChange={(e) => inputDescription(e)}
                        placeholder={product.description}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Imagen:
                      <input
                        value={image}
                        onChange={(e) => inputImage(e)}
                        placeholder={product.image}
                      />
                    </label>
                    <label className="form-label">
                      {" "}
                      Cantidad:
                      <input
                        value={quantity}
                        onChange={(e) => inputQuantity(e)}
                        placeholder={product.quantity}
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
