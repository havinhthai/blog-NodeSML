const express = require('express');
const router = express.Router();

const { 
    getAllCategories,
    getCategoryById,
    postNewCategory,
    editCategory,
    deleteCategory,
} = require('../controllers/admin.category.controller');
const { checkCategory } = require('../config/validate');

router.route('/add')
    .get((req, res) => {
        res.render('admin/category_add');
    })
    .post(checkCategory, (req, res, next) => {
        postNewCategory(req, res, next);
    });

router.route('/edit/:id')
    .get((req, res, next) => {
        getCategoryById(req, res, next);
    })
    .post(checkCategory, (req, res, next) => {
        editCategory(req, res, next);
    });

router.get('/delete/:id', (req, res, next) => {
    deleteCategory(req, res, next);
});

router.get('/manage', (req, res, next) => {
    getAllCategories(req, res, next);
});

module.exports = router;
