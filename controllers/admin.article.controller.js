const Article = require('../models/blog/article.model');

const addArticle = (req, res, next) => {
    const {
        title,
        description,
        content,
        author,
    } = req.body;

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
