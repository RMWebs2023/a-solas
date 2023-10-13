import axios from "axios";

// función que llama al url del servidor que trae los productos del servidor
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

// función que llama al url del servidor que crea productos
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

// función que llama al url del servidor que modifica productos
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

// función que llama al url del servidor que elimina productos
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

// función que llama al url del servidor que crea la preferencia para pagar por MercadoPago
export const createPreference = async (products) => {
  try {
    const response = await axios.post("/create_preference", {
      description: products.filter((item) => item.name),
      price: products.filter((item) => item.price),
      quantity: products.filter((item) => item.quantity),
    });
    return response.data.id;
  } catch (error) {
    console.log(error);
  }
};
