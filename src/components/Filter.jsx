import React from "react";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
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

  // filtro que filtra productos sin subcategoría
  const productWithoutSubcategory = data.filter(
    (product) => product.category && !product.subcategory
  );

  // filtro que filtra productos con subcategoría
  const productWithSubcategory = data.filter((product) => product.subcategory);

  // se crea un nuevo array de los productos con subcategoría
  const allCategoriesWithSubcategory = [
    ...new Set(productWithSubcategory.map((product) => product.category)),
  ];

  // se crea un nuevo array de los productos sin subcategoría
  const allCategories = [
    "Todas",
    ...new Set(
      productWithoutSubcategory
        .filter(
          (product) => !allCategoriesWithSubcategory.includes(product.category)
        )
        .map((product) => product.category)
    ),
  ];

  // obtener todas las subcategorías únicas de productos con subcategorías
  const allSubcategories = [
    "Todas",
    ...new Set(
      productWithSubcategory
        .filter((product) => product.subcategory)
        .map((product) => product.subcategory)
    ),
  ];

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3">
          <Offcanvas.Header className="offcanvas-header">
            <Offcanvas.Title
              className="offcanvas-title"
              id={`offcanvasNavbarLabel-expand-${expand}`}
            >
              Filtro
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="offcanvas-body cuerpo-filtro">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {/* Todos los botones de categorías sin subcategorías */}
              {allCategories.map((category, id) => (
                <Nav.Link
                  className="itemFiltro"
                  key={id}
                  onClick={() => filterCategory(category)}
                >
                  {category}
                </Nav.Link>
              ))}
            </Nav>

            {/* Todos los botones con subcategorías */}
            {allCategoriesWithSubcategory.map((category, id) => (
              <NavDropdown key={id} title={category}>
                <Nav.Link onClick={() => filterSubcategory("Todas", category)}>
                  Todas
                </Nav.Link>

                {allSubcategories
                  .filter((subcategory) =>
                    productWithSubcategory.some(
                      (product) =>
                        product.category === category &&
                        product.subcategory.includes(subcategory)
                    )
                  )
                  .map((subcategory, subId) => (
                    <Nav.Link
                      key={subId}
                      onClick={() => filterSubcategory(subcategory, category)}
                    >
                      {subcategory}
                    </Nav.Link>
                  ))}
              </NavDropdown>
            ))}

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
