import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import doctorReducer from '../slices/doctorSlice';
import bookingReducer from '../slices/bookingSlice';
import notificationReducer from '../slices/notificationSlice';
import chatbotReducer from '../slices/chatbotSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        doctor: doctorReducer,
        booking: bookingReducer,
        notification: notificationReducer,
        chatbot: chatbotReducer,
    },
});