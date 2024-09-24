import { FC } from "react";
import { ProductProps } from "../../types/type";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { getCurrency } from "../../utils/currencyUtils";

interface MediaCardProps {
  productsFilter: ProductProps[];
}

const MediaCard: FC<MediaCardProps> = ({ productsFilter }) => {
  const navigate = useNavigate();

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <>
      {productsFilter.map((product: ProductProps) => (
        <div
          className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
          key={product?.id}
          onClick={() => navigate(`/product-detail/${product.id}`)}
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
              <Rating rating={product?.rating?.rate} />
              <span className="text-sm text-gray-600">
                ({product?.rating?.count})
              </span>
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
