const express = require('express');
const router = express.Router();

const {
    addArticle,
} = require('../controllers/admin.article.controller');

router.route('/add')
    .get((req, res) => {
        res.render('admin/post_add');
    })
    .post((req, res) => {
        addArticle(req, res);
    });

module.exports = router;