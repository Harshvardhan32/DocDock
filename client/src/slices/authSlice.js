import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = "http://localhost:5000/api";

export const register = createAsyncThunk('auth/register', async (data) => {
  const res = await axios.post(`${API}/auth/register`, data);
  return res.data;
});

export const verifyOTP = createAsyncThunk('auth/verifyOTP', async (data) => {
  const res = await axios.post(`${API}/auth/verify-otp`, data);
  localStorage.setItem('token', res.data.token);
  return res.data;
});

export const login = createAsyncThunk('auth/login', async (data) => {
  const res = await axios.post(`${API}/auth/login`, data);
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    status: null,
    otpSent: false,
    otp: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.otpSent = true;
        state.otp = action.payload.otp;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.otpSent = true;
        state.otp = action.payload.otp;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.otpSent = false;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;