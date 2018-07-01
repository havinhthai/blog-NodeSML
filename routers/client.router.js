const express = require('express');
const router = express.Router();

const {
    getAllArticles,
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

router.get('/post', (req, res) => {
    res.render('client/post');
});

module.exports = router;
