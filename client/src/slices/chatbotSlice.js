import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = "http://localhost:5000/api";

export const sendMessage = createAsyncThunk('chatbot/sendMessage', async (message, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.post(`${API}/chatbot`, { message }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.reply;
});

const chatbotSlice = createSlice({
    name: 'chatbot',
    initialState: {
        messages: [],
        status: null,
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messages.push({ from: 'bot', text: action.payload });
            });
    }
});

export const { addMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;