const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

userSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('users', userSchema);
