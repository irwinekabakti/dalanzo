import { FC, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import MediaCard from "./components/ui/MediaCard";
import CustomPagination from "./components/ui/CustomPagination";
import { useAppDispatch } from "./store";
import { setProducts } from "./store/slice/products-slice";
import { useGetAllProductsQuery } from "./store/query/getProducts";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { data: products, isLoading, error } = useGetAllProductsQuery();

  useEffect(() => {
    if (products) {
      dispatch(setProducts(products));
    }
  }, [dispatch, products]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <>
      <Navbar />
      <Hero />
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 mx-4 md:mx-8">
          <MediaCard />
        </div>
        <CustomPagination />
      </div>
      <Footer />
    </>
  );
};

export default App;

/*
import { FC } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import MediaCard from "./components/ui/MediaCard";
import CustomPagination from "./components/ui/CustomPagination";

const App: FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 mx-4 md:mx-8">
          <MediaCard />
        </div>
        <CustomPagination />
      </div>
      <Footer />
    </>
  );
};

export default App;
*/
