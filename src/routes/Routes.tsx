import { FC, ReactNode } from "react";
import { Navigate, RouteObject, useLocation } from "react-router-dom";
import SignIn from "../pages/SignIn";
import RootLayout from "./RootLayout/RootLayout";
import ProductsList from "../pages/ProductsList";
import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/CartPage";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const user = localStorage.getItem("access_token");
  const location = useLocation();

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const Routes = (): RouteObject[] => {
  return [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <ProductsList />,
        },
        {
          path: "/products-list",
          element: <ProductsList />,
        },
        {
          path: "/product-detail/:id",
          element: <ProductDetail />,
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
  ];
};

export default Routes;
