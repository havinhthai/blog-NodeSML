const express = require('express');
const router = express.Router();

const {
    addArticle,
    deleteArticle,
    getArticles,
} = require('../controllers/admin.article.controller');
const { checkArticle } = require('../config/validate');

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

router.get('/manage', (req, res) => {
    getArticles(req, res);
});

module.exports = router;