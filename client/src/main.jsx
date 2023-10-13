import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createHashRouter, RouterProvider } from "react-router-dom";
import store, { saveState } from "./redux/store.js";
import Admin from "./pages/Admin";
import Home from "./pages/Home.jsx";
import Landing from "./pages/Landing";
import axios from "axios";

const router = createHashRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = "https://a-solas-pky3-dev.fl0.io/";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Root = () => {
  // hook que permite que al recargar la página se guarde el estado en localStorage
  useEffect(() => {
    window.addEventListener("unload", saveState);
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

root.render(<Root />);
