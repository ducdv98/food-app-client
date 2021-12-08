import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/auth.store';
import dishReducer from './store/dish.store';

const reducer = {
    auth: authReducer,
    dishes: dishReducer,
};

export const store = configureStore({
    reducer
});