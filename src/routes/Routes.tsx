import { Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import RootLayout from "./RootLayout/RootLayout";
import ProductsList from "../pages/ProductsList";
import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/CartPage";

const Routes = () => {
  const user = localStorage.getItem("access_token");

  return [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/products-list" replace />,
        },
        {
          path: "/products-list",
          element: <ProductsList />,
        },
        {
          path: "/product-detail/:id",
          element: user ? <ProductDetail /> : <Navigate to="/sign-in" />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        // {
        //   path: "/cart",
        //   element: user ? <CartPage /> : <Navigate to="/sign-in" />,
        // },
      ],
    },
    { path: "/sign-in", element: <SignIn /> },
  ];
};

export default Routes;
