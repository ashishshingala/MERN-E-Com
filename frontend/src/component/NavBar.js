import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { fetchCartItems } from "../reducers/cartReducer";
import { fetchSearchResults } from "../reducers/productReducer";
import { removeLocalStorage } from "../utils";
import { debounce } from "lodash";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cart.cartCount);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      dispatch(fetchSearchResults(query));
    }, 500),
    []
  );
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleLogout = () => {
    removeLocalStorage("e-comToken");
    removeLocalStorage("userId");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-500">
          E-Shop
        </Link>

        <div className="flex items-center space-x-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nav Links */}
        <div className="flex items-center space-x-8">
          <Link
            to="/products"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
          >
            Products
          </Link>

          <Link
            to="/add-products"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
          >
            Add Product
          </Link>

          {/* Cart Icon with Counter */}
          <Link
            to="/cart"
            className="relative flex items-center text-gray-600 hover:text-blue-500 transition duration-300"
          >
            <FaShoppingCart className="text-2xl w-8 h-10" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
