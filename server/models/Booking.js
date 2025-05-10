const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, // e.g. "2024-06-01"
    slot: { type: String, required: true }, // e.g. "09:00"
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
    notificationSent: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);