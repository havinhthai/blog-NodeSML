const mongoose = require('mongoose');
const getSlug = require('speakingurl');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: String,
    content: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
}, {
    timestamps: true,
});

articleSchema.pre('save', function(next) {
    const article = this;

    if (!article.isModified('title')) return next();

    const url = getSlug(article.title, {
        lang: 'vn',
    });

    article.url = url;

    next();
});

module.exports = mongoose.model('articles', articleSchema);
