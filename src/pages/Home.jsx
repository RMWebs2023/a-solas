import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/action";
import Header from "../components/Header";
import Card from "../components/Card";
import Cart from "../components/Cart";
import Filter from "../components/Filter";
import Comercial from "../components/Comercial";
import Footer from "../components/Footer";
import Paginated from "../components/Paginated";
import logo_blanco from "../imagenes/logo-blanco.png"
import Swal from "sweetalert2";
import "../style/header.css";
import "../style/home.css";

const Home = () => {
  const dispatch = useDispatch();
  const targetRef = useRef(null);

  const scrollToTarget = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // hook que llama productos de la base de datos
  const data = useSelector((state) => state.products);

  // efecto que llama a los productos al iniciar la página
  useEffect(() => {
    dispatch(getProducts());
    // alert de promoción
    Swal.fire({
      imageUrl: logo_blanco,
      imageHeight: 150,
      title: "SAN VALENTÍN",
      text: 'Ingresa el código "SANVALENTIN" antes de terminar tu compra y obtené un 20% OFF - Promocion solo valida para pagos en efectivo o transferencia bancaria',
      showConfirmButton: true,
    });
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
  const [count, setCount] = useState([]);
  localStorage.setItem("cart", JSON.stringify(allProducts));

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
  const filterSubcategory = (subcategory, category) => {
    if (subcategory === "Todas") {
      setProducts(
        data
          .filter((product) => product.category === category)
          .splice(0, itemsPerPage)
      );
      return;
    }

    const filterProduct = data.filter(
      (product) => product.subcategory === subcategory
    );

    setProducts(filterProduct).splice(0, itemsPerPage);
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

  return (
    <>
      <div className="Navbar_filter">
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
      <Comercial />
      <div className="filtroCard">
        <Filter
          name={name}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          filterCategory={filterCategory}
          filterSubcategory={filterSubcategory}
          scrollToTarget={scrollToTarget}
        />
        <Card
          targetRef={targetRef}
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
      </div>
      <Paginated
        dataPage={dataPage}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setProducts={setProducts}
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </>
  );
};

export default Home;
