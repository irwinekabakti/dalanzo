import { FC, useEffect } from "react";
import { Box } from "@mui/material";
import { useAppDispatch } from "../store";
import { useGetAllProductsQuery } from "../store/query/getProducts";
import { setProducts } from "../store/slice/products-slice";
import MediaSkeleton from "../components/ui/CustomSkeleton";
import Hero from "../components/Hero";
import MediaCard from "../components/ui/MediaCard";
import CustomPagination from "../components/ui/CustomPagination";

const ProductsList: FC = () => {
  const dispatch = useAppDispatch();
  const { data: products, isLoading, error } = useGetAllProductsQuery();

  useEffect(() => {
    if (products) {
      dispatch(setProducts(products));
    }
  }, [dispatch, products]);

  if (isLoading) {
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
  if (error) return <div>Error loading products</div>;

  return (
    <>
      <Hero />
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 mx-4 md:mx-8">
          <MediaCard />
        </div>
        <CustomPagination />
      </div>
    </>
  );
};

export default ProductsList;

// npm i react-slick
// "email": "don@gmail.com",
// "username": "donero",
// "password": "ewedon",
