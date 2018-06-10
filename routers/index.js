const express = require('express');
const router = express.Router();

const adminRouter = require('./admin.router');
const clientRouter = require('./client.router');

router.use('/admin', adminRouter);
router.use('/', clientRouter);

module.exports = router;
