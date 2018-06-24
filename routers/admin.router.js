const express = require('express');
const router = express.Router();

const authAdminRouter = require('./admin.auth.router');
const articleRouter = require('./admin.article.router');

router.use('/', authAdminRouter);
router.use('/article', articleRouter);

module.exports = router;