import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, phone_number, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(name, phone_number, password);
      localStorage.setItem('user', JSON.stringify(response.data));
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

export const login = createAsyncThunk(
  "auth/login",
  async ({ phone_number, password }, thunkAPI) => {
    try {
      const response = await AuthService.login(phone_number, password);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      if (error?.response?.status === 401) {
        toast.error('Số điện thoại hoặc mật khẩu không đúng, vui lòng thử lại!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
  localStorage.removeItem('user');
});

const initialState = {
  user: user ?? null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;