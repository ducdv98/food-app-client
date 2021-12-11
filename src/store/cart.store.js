import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

import CartService from "../services/cart.service";

const initialState = {
    items: [],
    delivery_info: null,
    loading: false,
    error: null
}

export const getCart = createAsyncThunk(
    "cart/getCart",
    async (_, thunkAPI) => {
        try {
            const response = await CartService.getCart();
            return response.data;
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

            toast.error('Có lỗi xảy ra, vui lòng thử lại!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateCart = createAsyncThunk(
    "cart/updateCart",
    async (item, thunkAPI) => {
        try {
            const response = await CartService.updateCart(item);
            return response.data;
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

            toast.error('Có lỗi xảy ra, vui lòng thử lại!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getDeliveryInfo = createAsyncThunk(
    "cart/getDeliveryInfo",
    async (_, thunkAPI) => {
        try {
            const response = await CartService.getDeliveryInfo();
            return response.data;
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

            toast.error('Có lỗi xảy ra, vui lòng thử lại!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const dishSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: builder => {
        builder.addCase(getCart.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        });
        builder.addCase(getCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        });

        builder.addCase(updateCart.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        });
        builder.addCase(updateCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        });

        builder.addCase(getDeliveryInfo.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getDeliveryInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.delivery_info = action.payload;
        });
        builder.addCase(getDeliveryInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        });
    },
});

const { reducer } = dishSlice;

export default reducer;