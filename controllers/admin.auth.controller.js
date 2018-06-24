const bcrypt = require('bcryptjs');
const {
    validationResult,
} = require('express-validator/check');

const User = require('../models/user/user.model');

const renderLogin = (req, res) => {
    res.render('admin/login');
}

const loginController = (req, res) => {
    const {
        username,
        password
    } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // [1, 2, 3, { a: 1 }]
        errors.array().forEach(e => {
            req.flash('danger', e.msg);
        });
        return res.redirect('/admin/login');
    }

    User.findOne({
        email: username
    }, (err, user) => {
        if (err) {
            req.flash('danger', err.toString());
            return;
        }

        if (!user || !bcrypt.compareSync(password, user.password)) {
            req.flash('danger', 'Wrong username or password type');

            return res.redirect('/admin/login');
        }

        // Login successssssss
        req.session.user = {
            _id: user._id,
            email: user.email,
            avatar: user.avatar,
            createdAt: user.createdAt,
        };

        res.redirect('/admin/dashboard');
    });
};

const registerController = (req, res) => {
    const {
        email,
        password
    } = req.body;

    const errors = validationResult(req);

    console.log('>> Error', errors.array());

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.redirect('/admin/register');
    }

    User.findOne({ email }, (err, user) => {
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

            req.session.user = {
                _id: user._id,
                email: user.email,
                avatar: user.avatar,
                createdAt: user.createdAt,
            };

            res.redirect('/admin/dashboard');
        });
    });
};

const logoutController = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return;
        }

        res.redirect('/admin/login');
    });
}

module.exports = {
    renderLogin,
    loginController,
    registerController,
    logoutController,
};
