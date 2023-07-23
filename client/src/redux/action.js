import axios from "axios";

export const getProducts = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get("/");
      return dispatch({ type: "GET_PRODUCTS", payload: res.data });
    } catch (error) {
      return { message: error.message };
    }
  };
};

export const postProducts = (data) => {
  return async function (dispatch) {
    try {
      const res = await axios.post("/", data);
      return dispatch({ type: "POST_PRODUCTS", payload: res.data });
    } catch (error) {
      return { message: error.message };
    }
  };
};

export const putProduct = (id, data) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`/${id}`, data);
      return dispatch({ type: "PUT_PRODUCT", payload: res.data });
    } catch (error) {
      return { message: error.message };
    }
  };
};

export const deleteProducts = (id) => {
  return async function (dispatch) {
    try {
      const res = await axios.delete(`/${id}`);
      return dispatch({ type: "DELETE_PRODUCTS", payload });
    } catch (error) {
      return { error: error.message };
    }
  };
};
