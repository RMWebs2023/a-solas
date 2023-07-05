import axios from "axios";
export const GET_PRODUCTS = "GET_PRODUCTS";

export const getProducts = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get("/");
      return dispatch({ type: GET_PRODUCTS, payload: json.data });
    } catch (error) {
      return { message: error.message };
    }
  };
};
