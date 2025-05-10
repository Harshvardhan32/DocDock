const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mobile: { type: String, required: true, unique: true },
    otp: { type: String }, // For mock OTP
    role: { type: String, enum: ['patient', 'doctor'], required: true },
    name: { type: String, required: true },
    // Doctor-specific fields
    specialties: [{ type: String }],
    availability: [{
        day: String,
        slots: [String], // e.g. ["09:00", "10:00"]
    }],
    clinic: {
        address: String,
        location: {
            type: { type: String, enum: ['Point'], default: 'Point' },
            coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
        }
    }
}, { timestamps: true });

userSchema.index({ "clinic.location": "2dsphere" });

module.exports = mongoose.model('User', userSchema);