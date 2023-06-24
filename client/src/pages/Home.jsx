import React, { useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import Cart from "../components/Cart";
import Filter from "../components/Filter";
import Personas from "../components/Personas";
import Footer from "../components/Footer";
import data from "../data/data";
import "../style/header.css";
import "../style/home.css";

const Home = () => {
  const itemsPerPage = 9;
  const [name, setName] = useState("");
  const [dataPage, setDataPage] = useState(data);
  const [products, setProducts] = useState([...data].splice(0, itemsPerPage));
  const [currentPage, setCurrentPage] = useState(0);

  // función que filtra los productos dependiendo su categoría
  const filterCategory = (category) => {
    if (category === "Todas") {
      setProducts([...data].splice(0, itemsPerPage));
      return;
    }

    const filterProduct = data.filter(
      (product) => product.category === category
    );

    setProducts([...filterProduct].splice(0, itemsPerPage));
  };

  // función que filtra los productos dependiendo su subcategoría
  const filterSubcategory = (subcategory) => {
    if (subcategory === "Todas") {
      setProducts(data.filter((p) => p.category === "Lubricantes"));
      return;
    }

    const filterProduct = data.filter(
      (product) => product.subcategory === subcategory
    );

    setProducts(filterProduct);
  };

  // funciones para la searchbar
  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = name;
    const search = data.filter(
      (product) =>
        product.category.toLowerCase().includes(text) ||
        product.name.toLowerCase().includes(text)
    );
    setProducts(search);
  };

  // botón next del paginado
  const nextHandler = () => {
    const allElements = dataPage.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * itemsPerPage;
    if (firstIndex > allElements) return;
    setProducts([...dataPage].splice(firstIndex, itemsPerPage));
    setCurrentPage(nextPage);
  };

  // botón prev del paginado
  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * itemsPerPage;
    setProducts([...dataPage].splice(firstIndex, itemsPerPage));
    setCurrentPage(prevPage);
  };

  return (
    <body>
      <div className="Navbar_filter">
        <Filter
          name={name}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          filterCategory={filterCategory}
          filterSubcategory={filterSubcategory}
        />
      </div>
      <Header />
      <Personas />
      <Card products={products} />
      <div className="paginado">
        <button className="paginado_boton" onClick={prevHandler}>
          Anterior
        </button>
        <div className="paginado_numero">{currentPage}</div>
        <button className="paginado_boton" onClick={nextHandler}>
          Siguiente
        </button>
      </div>
      <Cart />
      <Footer />
    </body>
  );
};

export default Home;
