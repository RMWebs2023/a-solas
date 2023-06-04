import React, { useState } from "react";
import Header from "../components/Header";
//import Searchbar from "../components/Searchbar";
import Card from "../components/Card";
import Filter from"../components/Filter"
import Personas from "../components/personas";
import data from "../data/data";
import "../style/index.css";
import "../style/header.css";
import { Navbar } from "react-bootstrap";

const Home = () => {
  // se crea un estado con todos los productos y que sea dinámico
  const [products, setProducts] = useState(data);
  const [name, setName] = useState("");

  // función que filtra los productos dependiendo su categoría
  const filterCategory = (category) => {
    if (category === "Todas") {
      setProducts(data);
      return;
    }

    const filterProduct = data.filter(
      (product) => product.category === category
    );

    setProducts(filterProduct);
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
    const nombre = name
    const map = data.filter(product=>product.category === nombre)
    setProducts(map)
  };

  return (
    <>
      <div className="Navbar_filter">
        <Filter name={name} handleChange={handleChange} handleSubmit={handleSubmit} filterCategory={filterCategory} filterSubcategory={filterSubcategory}/>
      </div>
      <Header />
      <Personas />
      <Card products={products} />
    </>
  );
};

export default Home;
