const {
    check,
} = require('express-validator/check');

const checkLogin = [
    check('username').not().isEmail().withMessage('Email invalid'),
    check('password').not().isEmpty().withMessage('Password is required'),
];

const checkRegister = [
    check('email').isEmail().withMessage('Email invalid'),
    check('password').not().isEmpty().withMessage('Password is required'),
    check('repassword', 'Password is not match').custom((value, { req }) => (
        req.body.password === value
    )),
];

module.exports = {
    checkLogin,
    checkRegister,
};
