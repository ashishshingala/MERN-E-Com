import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, removeFromCart } from "../reducers/cartReducer";
import { getLocalStorage } from "../utils";
import { showSuccessToast } from "./ToastMessage";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const userId = getLocalStorage("userId");
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );
 
  const handleRemove = (userId, productId) => {
    dispatch(removeFromCart({ userId, productId })).then(() => {
      dispatch(fetchCartItems());
      showSuccessToast("Successfully Removed Cart Item");
    });
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
         
          <div className="w-full lg:w-2/3">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <img
                  src={`${process.env.REACT_APP_API_URL}/${item.productId.image}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold">
                    {item.productId.name}
                  </h2>
                  <p className="text-gray-600">
                    ${item.productId.price} x {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  ${item.productId.price * item.quantity}
                </p>
                <button
                  onClick={() => handleRemove(userId, item.productId._id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${totalAmount}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">$5.00</span>
            </div>
            <div className="flex justify-between mb-4 border-t pt-2">
              <span className="text-gray-800 font-bold">Total</span>
              <span className="text-lg font-bold">${totalAmount + 5}</span>
            </div>
            <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
