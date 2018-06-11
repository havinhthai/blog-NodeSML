const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: String,
    role: {
        type: Number,
        default: 0,
    },
    age: {
        type: Number,
        min: 6,
        max: 69,
    }
}, { 
    timestamps: true,
});

module.exports = mongoose.model('users', userSchema);
