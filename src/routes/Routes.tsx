import { Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import RootLayout from "./RootLayout/RootLayout";
import ProductsList from "../pages/ProductsList";
import ProductDetail from "../pages/ProductDetail";

const Routes = () => {
  const user = localStorage.getItem("access_token");

  return [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/products-list",
          element: <ProductsList />,
        },
        {
          path: "/product-detail/:id",
          element: user ? <ProductDetail /> : <Navigate to="/sign-in" />,
        },
      ],
    },
    { path: "/sign-in", element: <SignIn /> },
  ];
};

export default Routes;
