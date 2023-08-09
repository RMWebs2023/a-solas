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
      <div className="prod-card">
      {products.map((product, id) => (
        <div className="card_admin" key={id}>
          
            <div className="producto">

              <p><b>Nombre del producto:</b><br /> {product.name}</p>
              <p><b>Precio:</b><br /> {product.price}</p>
              <p><b>Categoria:</b><br /> {product.category}</p>
              <p><b>Subcategoria:</b><br /> {product.subcategory}</p>
              <p><b>Descripcion:</b></p>
              <p className="desc-prod-adm"> {product.description}</p>
              <p><b>Imagen:</b><br /></p>
              <div className="img-prod-adm">
                <img className="img-prod-card-adm" src={product.image} />
              </div>
              <p><b>Stock:</b><br />{product.quantity}</p>

              <div className="edit-prod">
                <button className="boton" onClick={() => toggleEdit()}>Editar producto</button>
                <EditProduct show={modalEdit} close={toggleEdit} product={product} />
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
    </div>
  );
};

export default Admin;
