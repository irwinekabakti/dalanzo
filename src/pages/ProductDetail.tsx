import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../store/query/getProducts";
import { useAppDispatch, useAppSelector } from "../store";
import {
  setProductDetail,
  setLoading,
  setError,
} from "../store/slice/productDetail-slice";
import { FaStar } from "react-icons/fa";

const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector(
    (state) => state.productDetail
  );

  const { data, isLoading, isError } = useGetProductByIdQuery(Number(id));

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else if (isError) {
      dispatch(setError("Failed to fetch product details"));
    } else if (data) {
      dispatch(setProductDetail(data));
    }
  }, [data, isLoading, isError, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold mr-2">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span>
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

/*
import { FC } from "react";

const ProductDetail: FC = () => {
  return (
    <div>
      <h1>Product Detail</h1>
    </div>
  );
};

export default ProductDetail;
*/
