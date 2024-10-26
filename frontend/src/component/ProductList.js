import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../reducers/productReducer';
import ProductCard from './ProductCard';
const ProductList = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);
    console.log('products', products)
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    
    console.log('products--------------->?0',products)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {!loading&& products.length>0&&products.map(product => (
        <ProductCard 
          key={product._id} 
          product={product} 
          
        />
      ))}
    </div>
    );
};

export default ProductList;