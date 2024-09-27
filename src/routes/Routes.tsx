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

const SignInRoute: FC<{ element: ReactNode }> = ({ element }) => {
  const user = localStorage.getItem("access_token");
  const location = useLocation();

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{element}</>;
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
      element: <SignInRoute element={<SignIn />} />,
    },
  ];
};

export default Routes;

/*
import { RouteObject, redirect } from "react-router-dom";
import SignIn from "../pages/SignIn";
import RootLayout from "./RootLayout/RootLayout";
import ProductsList from "../pages/ProductsList";
import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/CartPage";

const authLoader = () => {
  const user = localStorage.getItem("access_token");
  if (!user) {
    return redirect("/sign-in");
  }
  return null;
};

const signInLoader = () => {
  const user = localStorage.getItem("access_token");
  if (user) {
    return redirect("/");
  }
  return null;
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
          element: <CartPage />,
          loader: authLoader,
        },
      ],
    },
    {
      path: "/sign-in",
      element: <SignIn />,
      loader: signInLoader,
    },
  ];
};

export default Routes;
*/
