const express = require('express');
const router = express.Router();

const {
    getAllArticles,
    getArticleByUrl,
 } = require('../controllers/client.article.controller');

router.get('/', (req, res, next) => {
    getAllArticles(req, res, next);
});

router.get('/about', (req, res) => {
    res.render('client/about');
});

router.get('/contact', (req, res) => {
    res.render('client/contact');
});

router.get('/post/:url', (req, res, next) => {
    getArticleByUrl(req, res, next);
});

module.exports = router;
