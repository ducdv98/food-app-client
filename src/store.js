import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/auth.store';
import dishReducer from './store/dish.store';
import cartReducer from './store/cart.store';

const reducer = {
    auth: authReducer,
    dishes: dishReducer,
    cart: cartReducer,
};

export const store = configureStore({
    reducer
});