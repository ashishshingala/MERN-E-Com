import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./component/Register";
import Login from "./component/Login";
import ProductList from "./component/ProductList";
import AddProduct from "./component/AddProduct";
import Navbar from "./component/NavBar";
import Cart from "./component/CartView";
import ToastNotifications from "./component/ToastMessage";

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <ToastNotifications />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isLoggedIn && (
          <>
            <Route path="/products" element={<ProductList />} />
            <Route path="/add-products" element={<AddProduct />} />
            <Route path="/cart" element={<Cart />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
