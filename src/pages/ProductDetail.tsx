import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { addToCart } from "../store/slice/cart-slice";
import Rating from "../components/ui/Rating";
import { getCurrency } from "../utils/currencyUtils";
import { getProductById } from "../store/asyncThunk/productDetail-thunk";
import { STATUS } from "../utils/status";
import SkeletonDetail from "../components/ui/Skeleton/SkeletonDetail";
import { selectProductWithQuantity } from "../store/slice/productDetail-slice";

const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.productDetail);
  const product = useAppSelector(selectProductWithQuantity);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"detail" | "categories">("detail");

  useEffect(() => {
    if (id) {
      dispatch(getProductById(Number(id)));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    const user = localStorage.getItem("access_token");

    if (!user) {
      navigate("/sign-in", { state: { from: `/product-detail/${id}` } });
      return;
    }

    if (product) {
      dispatch(
        addToCart({
          ...product,
          quantity: 1,
          availableQuantity: product.quantity,
        })
      );
    }
  };

  if (status === STATUS.LOADING) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <SkeletonDetail className="w-full h-96" />
          </div>
          <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
            <SkeletonDetail className="h-8 w-2/3 mb-4" />
            <SkeletonDetail className="h-6 w-full mb-4" />
            <SkeletonDetail className="h-6 w-full mb-4" />
            <SkeletonDetail className="h-6 w-1/2 mb-4" />
            <div className="flex items-center">
              <SkeletonDetail className="h-8 w-1/4 mr-4" />
              <SkeletonDetail className="h-6 w-1/3" />
            </div>
            <SkeletonDetail className="h-10 w-1/4 mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (status === STATUS.FAILED) {
    return <div>Error loading product: {error}</div>;
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <div className="mb-4">
            <div className="flex border-b">
              <button
                className={`py-2 px-4 ${
                  activeTab === "detail"
                    ? "border-l border-t border-r rounded-t text-blue-700 bg-white"
                    : "text-blue-500 hover:text-blue-800"
                }`}
                onClick={() => setActiveTab("detail")}
              >
                Detail
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "categories"
                    ? "border-l border-t border-r rounded-t text-blue-700 bg-white"
                    : "text-blue-500 hover:text-blue-800"
                }`}
                onClick={() => setActiveTab("categories")}
              >
                Categories
              </button>
            </div>
          </div>

          <div className="tab-content">
            {activeTab === "detail" && (
              <div>
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                <p className="text-gray-600 mb-4">{product.description}</p>
              </div>
            )}
            {activeTab === "categories" && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Categories</h2>
                <p>{product.category}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col mb-4 mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold mr-2">
                {getCurrency(product.price)}
              </span>
              <div className="flex items-center">
                <Rating rating={product.rating.rate} />
                <p className="ml-2">
                  {product.rating.rate} ({product.rating.count} reviews)
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              Quantity in stock: {product.quantity || "Not available"}
            </p>
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
