import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

import OrderService from "../services/order.service";

const initialState = {
    orders: [],
    currentOrderId: null,
    loading: false,
    error: null
}

export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (delivery_info, thunkAPI) => {
        try {
            const response = await OrderService.createOrder(delivery_info);
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

const orderSlice = createSlice({
    name: "orders",
    initialState,
    extraReducers: builder => {
        builder.addCase(createOrder.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.currentOrderId = action.payload.id;
            state.orders.push(action.payload)
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        });
    },
});

const { reducer } = orderSlice;

export default reducer;