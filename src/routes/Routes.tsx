import { Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import RootLayout from "./RootLayout/RootLayout";
import ProductsList from "../pages/ProductsList";

const Routes = () => {
  const user = localStorage.getItem("access_token");

  return [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/product-list",
          element: user ? <ProductsList /> : <Navigate to="/sign-in" />,
        },
      ],
    },
    { path: "/sign-in", element: <SignIn /> },
  ];
};

export default Routes;
