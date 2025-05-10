import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = "http://localhost:5000/api";

export const fetchDoctors = createAsyncThunk('doctor/fetchDoctors', async (params) => {
    const res = await axios.get(`${API}/doctors`, { params });
    return res.data;
});

export const updateProfile = createAsyncThunk('doctor/updateProfile', async (data, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.put(`${API}/doctors/profile`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
});

export const getDoctorById = createAsyncThunk('doctor/getDoctorById', async (id) => {
    const res = await axios.get(`${API}/doctors/${id}`);
    return res.data;
});

const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        doctors: [],
        selectedDoctor: null,
        status: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.doctors = action.payload;
            })
            .addCase(getDoctorById.fulfilled, (state, action) => {
                state.selectedDoctor = action.payload;
            });
    }
});

export default doctorSlice.reducer;