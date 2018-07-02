const express = require('express');
const router = express.Router();

const { 
    getAllCategories,
    postNewCategory,
} = require('../controllers/admin.category.controller');

router.route('/add')
    .get((req, res) => {
        res.render('admin/category_add');
    })
    .post((req, res, next) => {
        postNewCategory(req, res, next);
    });

router.get('/edit', (req, res) => {
    res.render('admin/category_edit');
});

router.get('/manage', (req, res, next) => {
    getAllCategories(req, res, next);
});

module.exports = router;
