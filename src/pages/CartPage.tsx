import { FC } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import {
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} from "../store/slice/cart-slice";
import { updateProductQuantity } from "../store/slice/products-slice";
import { useNavigate } from "react-router-dom";
import { getCurrency } from "../utils/currencyUtils";
import { toast } from "react-toastify";

const CartPage: FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const products = useAppSelector((state) => state.AllProducts.products);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    const product = products.find((p) => p.id === id);
    if (product && newQuantity <= product.quantity) {
      dispatch(updateCartItemQuantity({ id, quantity: newQuantity }));
    } else {
      toast.error("Requested quantity exceeds available stock.");
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCancel = () => {
    navigate("/products-list");
  };

  const handleCheckout = () => {
    // Update product quantities
    cartItems.forEach((item) => {
      dispatch(updateProductQuantity({ id: item.id, quantity: item.quantity }));
    });

    toast.success("Checkout successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    dispatch(clearCart());
    navigate("/products-list");
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-svh">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h1 className="text-red-600 text-2xl md:text-4xl">
            You haven't selected an item yet
          </h1>
        </div>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-4 text-left">Product</th>
                  <th className="px-4 py-4 text-left">Price</th>
                  <th className="px-4 py-4 text-left">Quantity</th>
                  <th className="px-4 py-4 text-left">Total</th>
                  <th className="px-4 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  const product = products.find((p) => p.id === item.id);
                  const availableQuantity = product ? product.quantity : 0;
                  return (
                    <tr key={item.id} className="border-b">
                      <td className="block px-4 py-4 md:flex items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-contain mr-4"
                        />
                        <span className="py-2">{item.title}</span>
                      </td>
                      <td className="px-4 py-4">{getCurrency(item.price)}</td>
                      <td className="px-4 py-4">
                        <input
                          type="number"
                          min="1"
                          max={availableQuantity}
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-16 px-2 py-1 border rounded"
                        />
                        <span className="ml-2 text-sm text-gray-500">
                          (Max: {availableQuantity})
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {getCurrency(item.price * item.quantity)}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded-lg"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-xl font-bold">
              Total: {getCurrency(totalPrice)}
            </div>
            <div>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={cartItems.length === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
