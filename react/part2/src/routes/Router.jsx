import React, { useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Product from "../components/Product";
import Cart from "../components/Cart";
// import Cart from "../components/Cart-ERP365";
import PaymentResult from "../components/PaymentResult";
import AuthForm from "../components/AuthForm";
// const [isAuth, setIsAuth] = useState(false);
// console.log(Router);
// !isAuth
//     ? {
//         path: "/",
//         element: <AuthForm />,
//       }
//     :
const Router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <AuthForm />,
  // },
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
console.log(Router);

export default Router;
