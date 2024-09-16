import { FC } from "react";
import { ProductProps } from "../../types/type";
import { FaStar } from "react-icons/fa";
import { RootState, useAppSelector } from "../../store";

const MediaCard: FC = () => {
  const { products, currentPage, itemsPerPage } = useAppSelector(
    (state: RootState) => state.product
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const getCurrency = (price: number) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
    return formatter.format(price);
  };

  return (
    <>
      {selectedProducts.map((product: ProductProps) => (
        <div
          className="bg-white shadow-md rounded-lg overflow-hidden"
          key={product?.id}
        >
          <img
            className="w-32 h-32 items-center mx-auto mt-4"
            src={product?.image}
            alt={product?.title}
          />
          <div className="p-4">
            <h5 className="text-xl font-bold mb-2">
              {truncateText(product?.title, 30)}
            </h5>
            <p className="text-gray-700 text-base">
              {truncateText(product?.description, 70)}
            </p>
          </div>
          <div className="p-4 flex justify-between">
            <div className="flex gap-2 items-center">
              <p className="text-lg">{product?.rating?.rate}</p>
              <FaStar className="text-yellow-400" />
            </div>
            <div className="text-black font-semibold">
              <h1 className="text-xl">{getCurrency(product?.price)}</h1>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MediaCard;

/*
import { FC, useEffect, useState } from "react";
import axios from "axios";
import { ProductProps } from "../../types/type";
import { FaStar } from "react-icons/fa";

const MediaCard: FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://fakestoreapi.com/products?limit=12"
    );
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const getCurrency = (price: number) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
    return formatter.format(price);
  };

  return (
    <>
      {products?.map((product: ProductProps) => (
        <div
          className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden"
          key={product?.id}
        >
          <img
            className="w-32 h-32 items-center mx-auto"
            src={product?.image}
            alt={product?.title}
          />
          <div className="p-4">
            <h5 className="text-xl font-bold mb-2">
              {truncateText(product?.title, 30)}
            </h5>
            <p className="text-gray-700 text-base">
              {truncateText(product?.description, 70)}
            </p>
          </div>
          <div className="p-4 flex justify-between">
            <div className="flex gap-2 items-center">
              <p>{product?.rating?.rate}</p>
              <FaStar className="text-yellow-400" />
            </div>
            <button className="text-blue-500 hover:underline">
              {getCurrency(product?.price)}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default MediaCard;
*/
