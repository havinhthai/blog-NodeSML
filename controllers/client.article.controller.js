const Article = require('../models/blog/article.model');

const getAllArticles = (req, res, next) => {
    Article
        .find()
        .select('-_id -createdAt -content -__v')
        .populate('author', '-_id email')
        .exec((err, articles) => {
            if (err) {
                const cError = new Error('Internal Server Error');
                cError.status = 500;
                return next(cError);
            }

            res.render('client/index', {
                articles,
            });
        });
}

const getArticleByUrl = (req, res, next) => {
    const url = req.params.url;

    Article
        .findOne({ url })
        .select('-_id -createdAt -__v')
        .populate('author', '-_id email')
        .exec((err, article) => {
            if (err) {
                const cError = new Error('Internal Server Error');
                cError.status = 500;
                return next(cError);
            }

            if (!article) {
                const cError = new Error('Not found');
                cError.status = 404;
                return next(cError);
            }

            res.render('client/post', {
                article,
            });
        });
}

module.exports = {
    getAllArticles,
    getArticleByUrl,
}
