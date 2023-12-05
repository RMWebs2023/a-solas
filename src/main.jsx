import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createHashRouter, RouterProvider } from "react-router-dom";
import store, { saveState } from "./redux/store.js";
import App from "./App.jsx";
import Admin from "./pages/Admin";
import Home from "./pages/Home.jsx";
import Landing from "./pages/Landing";
import Login from "./pages/Login.jsx";
import axios from "axios";
import Buyer from "./pages/Buyer.jsx";

// axios.defaults.baseURL = "https://a-solas-pky3-dev.fl0.io/";
axios.defaults.baseURL= "http://localhost:3000/"

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
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/buyer",
    element: <Buyer />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

const Root = () => {
  // hook que permite que al recargar la página se guarde el estado en localStorage
  useEffect(() => {
    window.addEventListener("unload", saveState);
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  );
};

root.render(<Root />);
