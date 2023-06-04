import React from "react";

const Searchbar = ({ name, handleChange, handleSubmit }) => {
  return (
    <>
      <input
        type="text"
        name="search"
        placerholder="Úsame"
        value={name}
        onChange={(event) => handleChange(event)}
      />
      <button
        href="#Lubricantes"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        SUBMIT
      </button>
    </>
  );
};

export default Searchbar;
