const express = require('express');
const router = express.Router();

const {
    middlewareModify,
    getArticle,
    getAddArticlePage,
    addArticle,
    editArticle,
    deleteArticle,
    getArticles,
    getArticlesByUser,
} = require('../controllers/admin.article.controller');
const { checkArticle } = require('../config/validate');

router.use(['/delete/:id', '/edit/:id'], middlewareModify);

router.route('/add')
    .get(getAddArticlePage)
    .post(checkArticle, addArticle);

router.get('/delete/:id', deleteArticle);

router.route('/edit/:id')
    .get(getArticle)
    .post(checkArticle, editArticle);

router.get('/manage', getArticles);

router.get('/manage-by-author', getArticlesByUser);

module.exports = router;