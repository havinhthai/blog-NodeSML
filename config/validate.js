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
    check('repassword').matches('password').withMessage('Password is not match'),
];

module.exports = {
    checkLogin,
    checkRegister,
};
