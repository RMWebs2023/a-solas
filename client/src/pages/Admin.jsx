import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/action";
import CreateProduct from "../components/CreateProduct";
import EditProduct from "../components/EditProduct";
import Paginated from "../components/Paginated";
import Filter from "../components/Filter";
import "../style/admin.css";

const Admin = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products);

  const [name, setName] = useState("");
  const [dataPage, setDataPage] = useState(data);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
  const [products, setProducts] = useState([...data].splice(0, itemsPerPage));

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

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <Filter
        name={name}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        filterCategory={filterCategory}
        filterSubcategory={filterSubcategory}
      />
      <div className="adm">
        <h1 className="adm-titulo">Administrador</h1>
        <div className="adm-cont">
          <CreateProduct />
        </div>

        <div></div>
        <div className="prod-card">
          {products.map((product, id) => (
            <div className="card_admin" key={id}>
              <div className="producto">
                <p>
                  <b>Nombre del producto:</b>
                  <br /> {product.name}
                </p>
                <p>
                  <b>Precio:</b>
                  <br /> {product.price}
                </p>
                <p>
                  <b>Categoria:</b>
                  <br /> {product.category}
                </p>
                <p>
                  <b>Subcategoria:</b>
                  <br /> {product.subcategory}
                </p>
                <p>
                  <b>Descripcion:</b>
                </p>
                <p className="desc-prod-adm"> {product.description}</p>
                <p>
                  <b>Imagen:</b>
                  <br />
                </p>
                <div className="img-prod-adm">
                  <img
                    className="img-prod-card-adm"
                    src={product.image.secure_url}
                  />
                </div>
                <p>
                  <b>Stock:</b>
                  <br />
                  {product.quantity}
                </p>

                <div className="edit-prod">
                  <EditProduct product={product} />
                </div>
              </div>
            </div>
          ))}
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
  );
};

export default Admin;
