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

module.exports = {
    getAllArticles,
}