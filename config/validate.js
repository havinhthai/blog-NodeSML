const {
    check,
} = require('express-validator/check');

const checkLogin = [
    check('username').isEmail().withMessage('Email invalid'),
    check('password').not().isEmpty().withMessage('Password is required'),
];

const checkRegister = [
    check('email').isEmail().withMessage('Email invalid'),
    check('password').not().isEmpty().withMessage('Password is required'),
    check('repassword', 'Password is not match').custom((value, { req }) => (
        req.body.password === value
    )),
];

const checkArticle = [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('content', 'Content must 6-1500 chars').custom((value) => {
        return value.trim().length >= 6 && value.trim().length <= 1500;
    }),
    check('author').not().isEmpty().withMessage('Author is required'),
];

module.exports = {
    checkLogin,
    checkRegister,
    checkArticle,
};
