const express = require('express');
const bcrypt = require('bcryptjs');
const {
    validationResult,
} = require('express-validator/check');
const router = express.Router();

const User = require('../models/user/user.model');

const { checkLogin, checkRegister } = require('../config/validate');

router.get('/', (req, res) => {
    res.render('admin/index');
});

router.get('/login', (req, res) => {
    res.render('admin/login');
});

router.post('/login', checkLogin, (req, res) => {
    const { username, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.redirect('/admin/login');
    }

    User.findOne({ email: username }, (err, user) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!user || !bcrypt.compareSync(password, user.password)) {
            console.log('>> Sai ten dang nhap hoac mk');

            return res.redirect('/admin/login');
        }

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

            console.log('Created user:', user);
            res.redirect('/admin');
        });
    });

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