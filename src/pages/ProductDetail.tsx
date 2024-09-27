import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useGetProductByIdQuery } from "../store/query/getProducts";
import { useAppDispatch, useAppSelector } from "../store";
import { addToCart } from "../store/slice/cart-slice";
import Rating from "../components/ui/Rating";
import { getCurrency } from "../utils/currencyUtils";
import { getProductById } from "../store/asyncThunk/products-thunk";
import { STATUS } from "../utils/status";

const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  // const {
  //   data: product,
  //   isLoading,
  //   isError,
  // } = useGetProductByIdQuery(Number(id));
  const { product, status, error } = useAppSelector(
    (state) => state.productDetail
  );
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"detail" | "categories">("detail");

  useEffect(() => {
    if (id) {
      dispatch(getProductById(Number(id)));
    }
  }, []);

  const handleAddToCart = () => {
    const user = localStorage.getItem("access_token");

    if (!user) {
      navigate("/sign-in", { state: { from: `/product-detail/${id}` } });
      return;
    }

    if (product) {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error loading product</div>;

  if (status === STATUS.LOADING) {
    return <div>Loading...</div>;
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

          <div className="flex justify-between items-center mb-4 mt-4">
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
