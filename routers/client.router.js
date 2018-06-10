const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('Hello JS');
// });

// router.get('/json', (req, res) => {
//     res.json({
//         name: 'Thai',
//         language: 'JS',
//     });
// });

router.get('/', (req, res) => {
    res.render('client/index');
});

router.get('/about', (req, res) => {
    res.render('client/about');
});

router.get('/contact', (req, res) => {
    res.render('client/contact');
});

router.get('/post', (req, res) => {
    res.render('client/post');
});

module.exports = router;
