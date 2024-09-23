import { FC } from "react";
import { ProductProps } from "../../types/type";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface MediaCardProps {
  productsFilter: ProductProps[];
}

const MediaCard: FC<MediaCardProps> = ({ productsFilter }) => {
  const navigate = useNavigate();

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
