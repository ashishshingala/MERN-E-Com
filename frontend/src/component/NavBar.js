import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import axiosInterceptor from '../Interceptor';

const Navbar = () => {
  const userId = useSelector((state) => state.user.userId);

  const fetchCart=async()=>{
    const response=await axiosInterceptor.get('/cart/671caca4a28ef47ab30e8374')
    console.log('response is here-llllllllllllllll<', response);
  }

  useEffect(()=>{
    fetchCart()
  },[])
  const cartItemCount = 1;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        <Link to="/" className="text-2xl font-bold text-blue-500">
          E-Shop
        </Link>

        
        <div className="flex items-center space-x-8">
          <Link to="/shop" className="text-gray-600 hover:text-blue-500 transition duration-300">
            Shop
          </Link>

          
          <Link to="/cart" className="relative flex items-center text-gray-600 hover:text-blue-500 transition duration-300">
            <FaShoppingCart className="text-2xl w-8 h-10" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full px-1">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Login Button */}
          <Link
            to="/add-products"
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
