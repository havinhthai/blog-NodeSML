const express = require('express');
const router = express.Router();

const User = require('../models/user/user.model');

router.get('/', (req, res) => {
    res.render('admin/index');
});

router.get('/login', (req, res) => {
    res.render('admin/login');
});

router.get('/register', (req, res) => {
    res.render('admin/register');
});

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    const user = new User({
        email,
        password,
    });

    // user.email = email;
    // user.password = password;

    user.save((err, user) => {
        if (err) {
            console.log('> Error create User:', err);
            return;
        }

        console.log('Created user:', user);
    })
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