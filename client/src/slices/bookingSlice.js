import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = "http://localhost:5000/api";

export const bookAppointment = createAsyncThunk('booking/bookAppointment', async (data, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.post(`${API}/bookings`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
});

export const fetchBookings = createAsyncThunk('booking/fetchBookings', async (_, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.get(`${API}/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
});

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        bookings: [],
        status: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.bookings = action.payload;
            });
    }
});

export default bookingSlice.reducer;