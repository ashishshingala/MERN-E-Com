import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import productReducer from "../reducers/productReducer";
import cartReducer from "../reducers/cartReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
