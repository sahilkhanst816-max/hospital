const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['DataEntry', 'user'],
        default: 'user'
    },
    phone: {
        type: String,
        required: true
    }
}, { timestamps: true })

const staff = mongoose.model('staff', staffSchema)
module.exports = staff