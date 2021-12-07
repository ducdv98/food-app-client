import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/auth.store';

const reducer = {
    auth: authReducer,
};

export const store = configureStore({
    reducer
});