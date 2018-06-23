const express = require('express');
const bcrypt = require('bcryptjs');
const {
    validationResult,
} = require('express-validator/check');
const router = express.Router();

const User = require('../models/user/user.model');

const { checkLogin, checkRegister } = require('../config/validate');

router.use((req, res, next) => {
    res.locals.flash_messages = req.session.flash;
    delete req.session.flash;
    next();
});

router.get('/login', (req, res) => {
    res.render('admin/login');
});

router.post('/login', checkLogin, (req, res) => {
    const { username, password } = req.body;

    console.log('>> Body:', req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // [1, 2, 3, { a: 1 }]
        errors.array().forEach(e => {
            req.flash('danger', e.msg);
        });
        return res.redirect('/admin/login');
    }

    User.findOne({ email: username }, (err, user) => {
        if (err) {
            req.flash('danger', err.toString());
            return;
        }

        if (!user || !bcrypt.compareSync(password, user.password)) {
             req.flash('danger', 'Wrong username or password type');

            return res.redirect('/admin/login');
        }

        // Login successssssss
        req.session.user = user;
        res.redirect('/admin');
    });
});

router.get('/register', (req, res) => {
    res.render('admin/register');
});

router.post('/register', checkRegister, (req, res) => {
    const { email, password } = req.body;
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.redirect('/admin/register');
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(err);
            return;
        }

        if (user) {
            console.log('>> User dang ky');
            return;
        }

        const cUser = new User({
            email,
            password,
        });

        // cUser.email = email;
        // cUser.password = password;

        cUser.save((err, user) => {
            if (err) {
                console.log('> Error create User:', err);
                return;
            }

            req.session.user = user;
            res.redirect('/admin');
        });
    });

});

router.use((req, res, next) => {
    if (req.session.user) {
        res.locals.cUser = req.session.user;
        return next();
    }

    req.flash('danger', 'Wtf login');
    res.redirect('/admin/login');
});

router.get('/', (req, res) => {
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

module.exports = router;