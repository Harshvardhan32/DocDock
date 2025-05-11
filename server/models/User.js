const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['Patient', 'Doctor'],
        required: true
    },
    specialties: [{
        type: String
    }],
    availability: [{
        day: String,
        slots: [String],
    }],
    clinic: {
        address: String,
        location: {
            type: {
                type: String, enum: ['Point'], default: 'Point'
            },
            coordinates: {
                type: [Number], default: [0, 0]
            },
        }
    }
}, { timestamps: true });

userSchema.index({ "clinic.location": "2dsphere" });
module.exports = mongoose.model('User', userSchema);