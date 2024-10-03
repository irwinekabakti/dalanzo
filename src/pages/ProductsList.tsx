import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import MediaSkeleton from "../components/ui/CustomSkeleton";
import Hero from "../components/Hero";
import MediaCard from "../components/ui/MediaCard";
import { getAllProducts } from "../store/asyncThunk/products-thunk";
import { STATUS } from "../utils/status";

const ProductsList: FC = () => {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector(
    (state) => state.AllProducts
  );
  const searchTerm = useAppSelector(
    (state) => state.AllProducts.searchProducts
  );
  const [filteredProducts, setFilteredProducts] = useState(products || []);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(getAllProducts());
    }
  }, []);

  useEffect(() => {
    if (products) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  if (status === STATUS.LOADING) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 mx-4 md:mx-8">
        {[...Array(12)].map((_, index) => (
          <Box sx={{ overflow: "hidden" }} key={index}>
            <MediaSkeleton loading />
          </Box>
        ))}
      </div>
    );
  }

  if (status === STATUS.FAILED) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <>
      <Hero />
      <div className="mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="flex justify-center items-center my-60">
            <h1 className="text-red-600 text-2xl md:text-4xl">
              Item not found
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 mx-4 md:mx-8">
            <MediaCard productsFilter={filteredProducts} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsList;
