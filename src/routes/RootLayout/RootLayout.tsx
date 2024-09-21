import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
// import { useEffect } from "react";

const RootLayout = () => {
  // const navigate = useNavigate();
  // const user = localStorage.getItem("access_token");

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/sign-in");
  //   }
  // }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
