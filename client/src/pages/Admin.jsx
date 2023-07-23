import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getProducts } from "../redux/action";
import CreateProduct from "../components/CreateProduct";
import EditProduct from "../components/EditProduct";

const Admin = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const toggleCreate = () => setModalCreate(!modalCreate);
  const toggleEdit = () => setModalEdit(!modalEdit);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const deleteClick = (id) => {
    dispatch(deleteProducts(id));
    alert("Se ha eliminado el producto correctamente");
    location.reload();
  };

  return (
    <>
      <h1>Administrador</h1>
      <button onClick={() => toggleCreate()}>Agregar producto</button>
      <CreateProduct show={modalCreate} close={toggleCreate} />
      {products.map((product, id) => (
        <div key={id}>
          <button onClick={() => toggleEdit()}>Editar</button>
          <EditProduct show={modalEdit} close={toggleEdit} product={product} />
          <button onClick={() => deleteClick(product._id)}>Eliminar</button>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.category}</p>
          <p>{product.subcategory}</p>
          <p>{product.description}</p>
          <img src={product.image} />
          <p>{product.quantity}</p>
        </div>
      ))}
    </>
  );
};

export default Admin;
