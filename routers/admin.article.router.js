const express = require('express');
const router = express.Router();

router.get('/add', (req, res) => {
    res.render('admin/post_add');
});

module.exports = router;