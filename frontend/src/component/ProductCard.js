import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, fetchCartItems } from "../reducers/cartReducer";
import { getLocalStorage } from "../utils";


const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const userId = getLocalStorage("userId");
  const onAddToCart = async (product) => {
    dispatch(addToCart({ userId, productId: product._id })).then(() => {
      dispatch(fetchCartItems());
    });
  };
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mt-4 ml-2">
      <img
        src={`http://localhost:5000/${product.image}`}
        alt={product.name}
        className="w-full h-72 object-cover mt-2"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="text-gray-500 text-sm mt-1 truncate">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-800">
            ${product.price}
          </span>
          <span className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <div className="mt-2 text-sm text-gray-600">
          <p>Stock: {product.stock}</p>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-300"
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
