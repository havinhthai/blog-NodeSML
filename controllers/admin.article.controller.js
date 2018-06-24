const {
    validationResult
} = require('express-validator/check');

const Article = require('../models/blog/article.model');

const getArticle = (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!article) {
            req.flash('danger', 'Can not found article');
            return res.redirect('/admin/article/manage');
        }

        const checkMessage = (flash_messages, prop) => (
            flash_messages && flash_messages['objBody'] ?
            flash_messages['objBody'][0][prop] :
            article[prop]
        );

        res.render('admin/post_edit', {
            article,
            checkMessage,
        });
    });
}

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

const editArticle = (req, res) => {
    const {
        title,
        description,
        content,
    } = req.body;
    const {
        id
    } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(e => {
            req.flash('danger', e.msg);
        });

        req.flash('objBody', {
            title,
            description,
            content,
        });

        return res.redirect(`/admin/article/edit/${id}`);
    }

    Article.findById({ _id: id }, (err, article) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!article) {
            req.flash('danger', 'Can not found article');
            return res.redirect('/admin/article/manage');
        }

        article.title = title;
        article.description = description;
        article.content = content;

        article.save((err) => {
            if (err) {
                req.flash('danger', 'Can not edit article');
                return res.redirect(`/admin/article/edit/${id}`);
            }

            req.flash('success', 'Edit article successfully');
            return res.redirect(`/admin/article/edit/${id}`);
        })
    });
}

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
    getArticle,
    addArticle,
    editArticle,
    deleteArticle,
    getArticles,
};
