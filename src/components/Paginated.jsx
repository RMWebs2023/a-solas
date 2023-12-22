import React from "react";
import "../style/home.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Paginated = ({
  dataPage,
  currentPage,
  itemsPerPage,
  setProducts,
  setCurrentPage,
}) => {
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
    <div className="paginado">
      <button className="paginado_boton" onClick={prevHandler}>
        <FaArrowLeft />
      </button>
      <div className="paginado_numero">{currentPage + 1}</div>
      <button className="paginado_boton" onClick={nextHandler}>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Paginated;
