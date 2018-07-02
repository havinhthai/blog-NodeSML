const express = require('express');
const router = express.Router();

router.get('/add', (req, res) => {
    res.render('admin/category_add');
});

router.get('/edit', (req, res) => {
    res.render('admin/category_edit');
});

router.get('/manage', (req, res) => {
    res.render('admin/category_manage');
});

module.exports = router;