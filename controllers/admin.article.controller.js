const {
    validationResult
} = require('express-validator/check');

const Article = require('../models/blog/article.model');

const addArticle = (req, res, next) => {
    const {
        title,
        description,
        content,
        author,
    } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(e => {
            req.flash('danger', e.msg);
        }); 

        req.flash('objBody', {
            title,
            description,
            content,
            author,
        });

        return res.redirect('/admin/article/add');
    }

    const article = new Article({
        title,
        description,
        content,
        author,
    });

    article.save((err) => {
        if (err) {
            console.log(err);
            return;
        }

        res.redirect('/admin/dashboard');
    });
};

module.exports = {
    addArticle,
};
