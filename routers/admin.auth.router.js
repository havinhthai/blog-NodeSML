const express = require('express');
const router = express.Router();

const {
    renderLogin,
    loginController,
    registerController,
    logoutController,
} = require('../controllers/admin.auth.controller');

const {
    checkLogin,
    checkRegister
} = require('../config/validate');

router.use((req, res, next) => {
    res.locals.flash_messages = req.session.flash;
    delete req.session.flash;
    next();
});

router.use(['/login', '/register'], (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/admin/dashboard');
    }

    next();
});

router.route('/login')
    .get((req, res) => {
        renderLogin(req, res);
    })
    .post(checkLogin, (req, res) => {
        loginController(req, res);
    });

router.route('/register')
    .get((req, res) => {
        res.render('admin/register');
    })
    .post(checkRegister, (req, res) => {
        registerController(req, res);
    });

router.use((req, res, next) => {
    if (req.session.user) {
        res.locals.cUser = req.session.user;
        return next();
    }

    req.flash('danger', 'Wtf login');
    res.redirect('/admin/login');
});

router.get('/dashboard', (req, res) => {
    res.render('admin/index');
});

router.get('/post/add', (req, res) => {
    res.render('admin/post_add');
});

router.get('/post/manage', (req, res) => {
    res.render('admin/post_manage');
});

router.get('/profile', (req, res) => {
    res.render('admin/profile');
});

router.get('/logout', (req, res) => {
    logoutController(req, res);
});

module.exports = router;