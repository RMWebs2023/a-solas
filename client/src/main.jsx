import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store, { saveState } from "./redux/store.js";
import App from "./App.jsx";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = "https://a-solas-pky3-dev.fl0.io/"

const root = ReactDOM.createRoot(document.getElementById("root"));

const Root = () => {
  // hook que permite que al recargar la página se guarde el estado en localStorage
  useEffect(() => {
    window.addEventListener("unload", saveState);
  }, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

root.render(<Root />);
