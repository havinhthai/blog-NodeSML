const express = require('express');
const router = express.Router();

const {
    middlewareModify,
    getArticle,
    addArticle,
    editArticle,
    deleteArticle,
    getArticles,
    getArticlesByUser,
} = require('../controllers/admin.article.controller');
const { checkArticle } = require('../config/validate');

router.use(['/delete/:id', '/edit/:id'], (req, res, next) => {
    middlewareModify(req, res, next);
});

router.route('/add')
    .get((req, res) => {
        res.render('admin/post_add');
    })
    .post(checkArticle, (req, res) => {
        addArticle(req, res);
    });

router.get('/delete/:id', (req, res) => {
    deleteArticle(req, res);
});

router.route('/edit/:id')
    .get((req, res) => {
        getArticle(req, res);
    })
    .post(checkArticle, (req, res) => {
        editArticle(req, res);
    });

router.get('/manage', (req, res) => {
    getArticles(req, res);
});

router.get('/manage-by-author', (req, res) => {
    getArticlesByUser(req, res);
});

module.exports = router;