import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Register from './component/Register';
import Login from './component/Login'
import ProductList from './component/ProductList'
import AddProduct from './component/AddProduct';
import Navbar from './component/NavBar';
//import Login from './pages/Login';

const App = () => {
    const userId = useSelector((state) => state.user.userId);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    console.log('userId', userId)
    console.log(';isLoggedIn', isLoggedIn)
    return (
        
            <Router>
            {isLoggedIn && (
            <Navbar/>
            )}
                <Routes>
                    
                    <Route exact path="/" element={<Login/>} /> 
                    <Route exact  path="/register" element={<Register/>} />
                    {isLoggedIn && (
                        <>
                        <Route exact path="/products" element={<ProductList/>} />
                        <Route exact path="/add-products" element={<AddProduct/>} />  
                        </>
                       
                    )}
                    {/* </Route> */}
                </Routes>
            </Router>
        
    );
};

export default App;