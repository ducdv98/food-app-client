import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

import DishService from "../services/dish.service";

const initialState = {
    dishes: [],
    categories: [],
    dishLoading: false,
    categoryLoading: false,
    error: null
}

export const getDishes = createAsyncThunk(
    "dishes/getDishes",
    async (_, thunkAPI) => {
        try {
            const response = await DishService.getDishes();
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

export const getCategories = createAsyncThunk(
    "dishes/getCateogries",
    async (_, thunkAPI) => {
        try {
            const response = await DishService.getCategories();
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

export const getDishById = createAsyncThunk(
    "dishes/getDishById",
    async (id, thunkAPI) => {
        try {
            const response = await DishService.getDishById(id);
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
    name: "dishes",
    initialState,
    extraReducers: builder => {
        builder.addCase(getDishes.pending, (state, action) => {
            state.dishLoading = true;
        });
        builder.addCase(getDishes.fulfilled, (state, action) => {
            state.dishLoading = false;
            state.dishes = action.payload;
        });
        builder.addCase(getDishes.rejected, (state, action) => {
            state.dishLoading = false;
            state.error = action.payload
        });

        builder.addCase(getCategories.pending, (state, action) => {
            state.categoryLoading = true;
        });
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categoryLoading = false;
            state.categories = action.payload;
        });
        builder.addCase(getCategories.rejected, (state, action) => {
            state.categoryLoading = false;
            state.error = action.payload
        });

        builder.addCase(getDishById.pending, (state, action) => {
            state.dishLoading = true;
        });
        builder.addCase(getDishById.fulfilled, (state, action) => {
            state.dishLoading = false;

            const result = action.payload;

            const dish = state.dishes.find(d => d.id.localeCompare(result.id) === 0);
            if (!dish) {
                state.dishes.push(result);
            }
        });
        builder.addCase(getDishById.rejected, (state, action) => {
            state.dishLoading = false;
            state.error = action.payload
        });
    },
});

const { reducer } = dishSlice;

export default reducer;