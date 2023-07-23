const initialState = {
  products: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "POST_PRODUCTS":
      return {
        ...state,
      };
    case "PUT_PRODUCTS":
      return {
        ...state,
      };
    case "DELETE_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
