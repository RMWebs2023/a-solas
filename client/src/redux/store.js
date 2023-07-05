import rootReducer from "./reducer";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

// variable que crea un estado en el localStorage
const globalState = localStorage.getItem("GLOBAL_STATE");

// variable que crea un estado inicial en el localStorage
const initialState = globalState ? JSON.parse(globalState) : undefined;

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

// función que guarda el estado en el localStorage
export const saveState = () => {
  const state = store.getState();

  localStorage.setItem("GLOBAL_STATE", JSON.stringify(state));
};

export default store;
