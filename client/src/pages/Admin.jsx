import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/action";
import CreateProduct from "../components/CreateProduct";
import EditProduct from "../components/EditProduct";
import "../style/admin.css";

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

  return (
    <div className="adm">
      <h1 className="adm-titulo">Administrador</h1>
      <div className="adm-cont">
        <button className="boton" onClick={() => toggleCreate()}>Agregar producto</button>
        <CreateProduct show={modalCreate} close={toggleCreate} />
      </div>
      
      <div>
        
      </div>

      {products.map((product, id) => (
        <div key={id}>
          <div className="prod-card">
            <div className="producto">

              <p>{product.name}</p>
              <p>{product.price}</p>
              <p>{product.category}</p>
              <p>{product.subcategory}</p>
              <p>{product.description}</p>
              <img src={product.image} />
              <p>{product.quantity}</p>

              <div className="edit-prod">
                <button className="boton" onClick={() => toggleEdit()}>Editar producto</button>
                <EditProduct show={modalEdit} close={toggleEdit} product={product} />
              </div>
            </div>
          </div>
          {/*<button className="boton" onClick={() => deleteClick(product._id)}>Eliminar</button>*/}
          
          
          {/*<div className="edit-prod">
            <button className="boton" onClick={() => toggleEdit()}>Editar producto</button>
            <EditProduct show={modalEdit} close={toggleEdit} product={product} />
          </div>*/}

        </div>
      ))}
    </div>
  );
};

export default Admin;
