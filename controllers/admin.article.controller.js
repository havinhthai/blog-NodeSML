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
            req.flash('danger', 'Add article failed');
            return res.redirect('/admin/article/add');
        }

        req.flash('success', 'Add article successfully');
        res.redirect('/admin/article/manage');
    });
};

const deleteArticle = (req, res) => {
    Article.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            console.log(err);
            req.flash('danger', 'Delete article failed');
            return res.redirect('/admin/article/manage');
        }

        req.flash('success', 'Delete article successfully');
        res.redirect('/admin/article/manage');
    });
};

const getArticles = (req, res) => {
     Article
        .find()
        .populate('author', '-_id email')
        .select({
            title: 1,
            author: 1,
            updatedAt: 1,
        })
        .exec((err, articles) => {
            if (err) {
                console.log(err);
                return;
            }

            res.render('admin/post_manage', {
                articles,
            });
        });
}

module.exports = {
    addArticle,
    deleteArticle,
    getArticles,
};
