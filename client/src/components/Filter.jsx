import React from "react";
import {
  sinSubcategory,
  subLubricantes,
  subDisfraces,
  subLenceria,
} from "../data/functions";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../style/navbar.css";

const Filter = ({
  name,
  handleChange,
  handleSubmit,
  filterCategory,
  filterSubcategory,
}) => {
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
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
                  Categorías de productos
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="offcanvas-body">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* Todos los botones de categorías menos los que tiene subcategorías */}
                  {sinSubcategory.map((category, id) => (
                    <Nav.Link
                      key={id}
                      href="#producto"
                      onClick={() => filterCategory(category)}
                    >
                      {category}
                    </Nav.Link>
                  ))}

                  <NavDropdown
                    title="Lubricantes"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    {subLubricantes.map((subcategory, id) => (
                      <Dropdown.Item
                        key={id}
                        href="#producto"
                        onClick={() => filterSubcategory(subcategory)}
                      >
                        {subcategory}
                      </Dropdown.Item>
                    ))}
                  </NavDropdown>

                  <NavDropdown
                    title="Disfraces"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    {subDisfraces.map((subcategory, id) => (
                      <Dropdown.Item
                        key={id}
                        href="#producto"
                        onClick={() => filterSubcategory(subcategory)}
                      >
                        {subcategory}
                      </Dropdown.Item>
                    ))}
                  </NavDropdown>

                  <NavDropdown
                    title="Lenceria"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    {subLenceria.map((subcategory, id) => (
                      <Dropdown.Item
                        key={id}
                        href="#producto"
                        onClick={() => filterSubcategory(subcategory)}
                      >
                        {subcategory}
                      </Dropdown.Item>
                    ))}
                  </NavDropdown>
                </Nav>
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
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Filter;
