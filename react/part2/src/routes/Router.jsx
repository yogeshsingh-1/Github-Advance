import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Product from "../components/Product";
import Cart from "../components/Cart";
import PaymentResult from "../components/PaymentResult";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/courses",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/payment-result",
        element: <PaymentResult />,
      },
    ],
  },
  {
    path: "*",
    element: "Page Not Found!",
  },
]);

export default Router;
