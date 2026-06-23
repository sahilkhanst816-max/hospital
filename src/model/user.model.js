const mongoose = require('mongoose')
function generateRandomCode(length = 8) {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['DataEntry', 'user'],
        default: 'user'
    },
    dailyRoutine: [{

        bloodGroup: { type: String },
        weight: { type: Number },
        heartBeat: { type: Number },
        bloodPressure: { type: String },
        currentCondition: { type: String },
        pastOperations: [{ type: String }],
        imageUrl: { type: String, default: "" },
        uniqueCode: { type: String },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
        allergies: [{
            food: { type: String },
            alerts: {
                type: String,
                enum: ['OK', 'NO', 'ATTENTION!']
            }
        }],
        checkupTime: {
            type: Date,
            default: Date.now 
        },
    }, { timestamps: true }],

    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    code: {
        type: String,
        default: () => generateRandomCode(8),
        unique: true
    }
}, { timestamps: true })


const user = mongoose.model('user', userSchema)


const dailyRoutineSchema = new mongoose.Schema({

    bloodGroup: {
        type: String,
        trim: true
    },
    weight: {
        type: Number
    },


    heartBeat: {
        type: Number
    },
    bloodPressure: {
        type: String
    },
    currentCondition: {
        type: String,
        required: true
    },
    pastOperations: [
        {
            type: String
        }
    ],
    allergies: [
        {
            type: String
        }
    ],
    imageUrl: {
        type: String,
        default: ""
    },


    uniqueCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    }
}, { timestamps: true })
const dailyRoutine = mongoose.model('DailyRoutine', dailyRoutineSchema)
module.exports = { user, dailyRoutine }
