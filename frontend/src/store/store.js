import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import productReducer from '../reducers/productReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
    product:productReducer
    
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;