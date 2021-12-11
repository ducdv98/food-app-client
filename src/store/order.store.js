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

export const getOrders = createAsyncThunk(
    "orders/getOrders",
    async (_, thunkAPI) => {
        try {
            const response = await OrderService.getOrders();
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

export const getOrderById = createAsyncThunk(
    "orders/getOrderById",
    async (id, thunkAPI) => {
        try {
            const response = await OrderService.getOrderById(id);
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

export const reorder = createAsyncThunk(
    "orders/reorder",
    async (id, thunkAPI) => {
        try {
            const response = await OrderService.reorder(id);
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

        builder.addCase(getOrders.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        });
        builder.addCase(getOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        });

        builder.addCase(getOrderById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getOrderById.fulfilled, (state, action) => {
            const order = action.payload
            state.loading = false;
            const existed = state.orders.find(o => o.id === order.id);
            if (!existed) {
                state.orders.push(order)
            }
        });
        builder.addCase(getOrderById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        });

        builder.addCase(reorder.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(reorder.fulfilled, (state, action) => {
            state.loading = false;

        });
        builder.addCase(reorder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        });
    },
});

const { reducer } = orderSlice;

export default reducer;