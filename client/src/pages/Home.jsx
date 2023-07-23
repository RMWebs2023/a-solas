import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/action";
import Header from "../components/Header";
import Card from "../components/Card";
import Cart from "../components/Cart";
import Filter from "../components/Filter";
import Personas from "../components/Personas";
import Footer from "../components/Footer";
import "../style/header.css";
import "../style/home.css";

const Home = () => {
  const dispatch = useDispatch();
  // hook que llama productos de la bdd
  const data = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  // estados para filtrado y paginado
  const itemsPerPage = 9;
  const [name, setName] = useState("");
  const [dataPage, setDataPage] = useState(data);
  const [products, setProducts] = useState([...data].splice(0, itemsPerPage));
  const [currentPage, setCurrentPage] = useState(0);

  // estados del carrito
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [count, setCount] = useState(1);

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
    <>
      <div className="Navbar_filter">
        <Filter
          name={name}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          filterCategory={filterCategory}
          filterSubcategory={filterSubcategory}
        />
        <Cart
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          total={total}
          setTotal={setTotal}
          countProducts={countProducts}
          setCountProducts={setCountProducts}
          count={count}
          setCount={setCount}
        />
      </div>
      <Header />
      <Personas />
      <Card
        products={products}
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
        count={count}
        setCount={setCount}
      />
      <div className="paginado">
        <button className="paginado_boton" onClick={prevHandler}>
          Anterior
        </button>
        <div className="paginado_numero">{currentPage}</div>
        <button className="paginado_boton" onClick={nextHandler}>
          Siguiente
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Home;
