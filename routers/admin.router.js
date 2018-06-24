const express = require('express');
const router = express.Router();

const authAdminRouter = require('./admin.auth.router');
const articleRouter = require('./admin.article.router');

router.use((req, res, next) => {
    res.locals.flash_messages = req.session.flash;
    delete req.session.flash;
    next();
});

router.use('/', authAdminRouter);
router.use('/article', articleRouter);

module.exports = router;