import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = "http://localhost:5000/api";

export const fetchNotifications = createAsyncThunk('notification/fetchNotifications', async (_, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.get(`${API}/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
});

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        status: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload;
            });
    }
});

export default notificationSlice.reducer;