import React from "react";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../style/filtro.css";

const Filter = ({
  name,
  handleChange,
  handleSubmit,
  filterCategory,
  filterSubcategory,
}) => {
  // hook que llama productos de la bdd
  const data = useSelector((state) => state.products);

  // se crea un nuevo array de las categorías de los productos
  const allCategories = [
    "Todas",
    ...new Set(data.map((product) => product.category)),
  ];

  // variable que filtra las categorías que no tienen subcategorías
  const sinSubcategory = allCategories.filter(
    (category) =>
      category !== "Lubricantes" &&
      category !== "Disfraces" &&
      category !== "Lenceria"
  );

  // división de subcategorías de lubricantes
  const lubricantes = data.filter(
    (product) => product.category === "Lubricantes"
  );

  const subLubricantes = [
    "Todas",
    ...new Set(lubricantes.map((lubricante) => lubricante.subcategory)),
  ];

  // división de subcategorías de disfraces
  const disfraces = data.filter((product) => product.category === "Disfraces");

  const subDisfraces = [
    "Todas",
    ...new Set(disfraces.map((disfraz) => disfraz.subcategory)),
  ];

  // división de subcategorías de lencería
  const lenceria = data.filter((product) => product.category === "Lenceria");

  const subLenceria = [
    "Todas",
    ...new Set(lenceria.map((lenc) => lenc.subcategory)),
  ];

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3">
            <Offcanvas.Header closeButton className="offcanvas-header">
              <Offcanvas.Title className="offcanvas-title" id={`offcanvasNavbarLabel-expand-${expand}`}>
                Filtro
              </Offcanvas.Title>
            </Offcanvas.Header>
              <Offcanvas.Body className="offcanvas-body cuerpo-filtro">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* Todos los botones de categorías menos los que tiene subcategorías */}
                  {sinSubcategory.map((category, id) => (
                    <Nav.Link className="itemFiltro" key={id} href="#producto" onClick={() => filterCategory(category)}>
                      {category}
                    </Nav.Link>
                  ))}
                </Nav>

                {/* Barra de búsqueda */}
                <Form className="d-flex">
                  <Form.Control 
                    type="search"
                    placeholder="Producto"
                    className="me-2"
                    aria-label="Search"
                    value={name}
                    onChange={(event) => handleChange(event)}
                  />
                  <Button
                    className="boton"
                    variant="outline-light"
                    type="submit"
                    onClick={(event) => {
                      handleSubmit(event);
                      location.href = "#producto";
                    }}
                  >
                    Buscar
                  </Button>
                </Form>
              </Offcanvas.Body>
        </Navbar>
      ))}
    </>
  );
};

export default Filter;
