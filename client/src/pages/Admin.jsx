import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/action";
import CreateProduct from "../components/CreateProduct";
import Paginated from "../components/Paginated";
import Filter from "../components/Filter";
import CardAdmin from "../components/CardAdmin";
import "../style/admin.css";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // hook que llama productos de la base de datos
  const data = useSelector((state) => state.products);

  // efecto que llama a los productos al iniciar la página
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const [name, setName] = useState("");
  const [dataPage, setDataPage] = useState(data);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
  const [products, setProducts] = useState([...data].splice(0, itemsPerPage));
  
  // estado para login
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [password, setPassword] = useState(localStorage.getItem("password"));

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
      {user && password ? (
        <>
          <div className="adm">
            <h1 className="adm-titulo">Administrador</h1>
            <div className="adm-cont">
              <CreateProduct />
            </div>

            <div className="filtroCard">
              <Filter
                name={name}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                filterCategory={filterCategory}
                filterSubcategory={filterSubcategory}
              />
              <div className="prod-card">
                <CardAdmin products={products} />
              </div>
            </div>
          </div>
          <Paginated
            dataPage={dataPage}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setProducts={setProducts}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default Admin;
