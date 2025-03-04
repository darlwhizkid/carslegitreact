const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    make: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    registrationStatus: {
        type: String,
        enum: ['active', 'pending', 'expired'],
        default: 'pending'
    },
    registrationExpiry: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
