import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/auth.store';
import dishReducer from './store/dish.store';
import cartReducer from './store/cart.store';
import orderReducer from './store/order.store';

const reducer = {
    auth: authReducer,
    dishes: dishReducer,
    cart: cartReducer,
    orders: orderReducer
};

export const store = configureStore({
    reducer
});