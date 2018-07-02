const mongoose = require('mongoose');
const getSlug = require('speakingurl');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    url: {
        type: String,
        unique: true,
        trim: true,
    },
}, {
    timestamps: true,
});

categorySchema.pre('save', function(next) {
    const category = this;
    if (!category.isModified('name')) return next();

    const url = getSlug(category.name, { lang: 'vn' });

    category.url = url;

    next();
});

module.exports = mongoose.model('categories', categorySchema);